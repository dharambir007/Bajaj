export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { data } = req.body || {};

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: "data must be an array" });
  }

  const VALID_REGEX = /^[A-Z]->[A-Z]$/;

  const invalid_entries = [];
  const seen_edges = new Set();
  const duplicate_edges = [];
  const valid_edges = [];

  for (const raw of data) {
    const entry = typeof raw === "string" ? raw.trim() : String(raw).trim();

    if (!VALID_REGEX.test(entry)) {
      invalid_entries.push(raw);
      continue;
    }

    const [src, dst] = entry.split("->");
    if (src === dst) {
      invalid_entries.push(raw);
      continue;
    }

    if (seen_edges.has(entry)) {
      if (!duplicate_edges.includes(entry)) {
        duplicate_edges.push(entry);
      }
      continue;
    }

    seen_edges.add(entry);
    valid_edges.push({ src, dst });
  }

  const nodes = new Set();
  for (const { src, dst } of valid_edges) {
    nodes.add(src);
    nodes.add(dst);
  }

  const adj = {};
  const indegree = {};
  for (const n of nodes) {
    adj[n] = [];
    indegree[n] = 0;
  }

  const assigned_parents = {};
  for (const { src, dst } of valid_edges) {
    if (assigned_parents[dst] === undefined) {
      assigned_parents[dst] = src;
      adj[src].push(dst);
      indegree[dst]++;
    }
  }

  const visited_component = {};

  function get_component(start, comp_id) {
    const stack = [start];
    const comp = new Set();
    while (stack.length) {
      const n = stack.pop();
      if (visited_component[n] !== undefined) continue;
      visited_component[n] = comp_id;
      comp.add(n);
      for (const nb of (adj[n] || [])) {
        if (visited_component[nb] === undefined) stack.push(nb);
      }
      for (const [src, dsts] of Object.entries(adj)) {
        if (dsts.includes(n) && visited_component[src] === undefined) stack.push(src);
      }
    }
    return comp;
  }

  const node_list = Array.from(nodes).sort();
  const components = [];
  let comp_id = 0;

  for (const n of node_list) {
    if (visited_component[n] === undefined) {
      const comp = get_component(n, comp_id);
      components.push(comp);
      comp_id++;
    }
  }

  function detect_cycle_dfs(comp_nodes) {
    const color = {};
    for (const n of comp_nodes) color[n] = 0;
    let has_cycle = false;

    function dfs(u) {
      color[u] = 1;
      for (const v of (adj[u] || [])) {
        if (color[v] === 1) { has_cycle = true; return; }
        if (color[v] === 0) dfs(v);
      }
      color[u] = 2;
    }

    for (const n of comp_nodes) {
      if (color[n] === 0) dfs(n);
    }
    return has_cycle;
  }

  function build_tree(root) {
    const result = {};
    const stack = [[root, result]];
    const visited = new Set([root]);

    while (stack.length) {
      const [node, obj] = stack.pop();
      obj[node] = {};
      for (const child of (adj[node] || [])) {
        if (!visited.has(child)) {
          visited.add(child);
          stack.push([child, obj[node]]);
        }
      }
    }
    return result[root];
  }

  function get_depth(tree_obj) {
    if (!tree_obj || Object.keys(tree_obj).length === 0) return 1;
    let max = 0;
    for (const child of Object.values(tree_obj)) {
      const d = get_depth(child);
      if (d > max) max = d;
    }
    return max + 1;
  }

  const hierarchies = [];

  for (const comp of components) {
    const comp_nodes = Array.from(comp).sort();
    const has_cycle = detect_cycle_dfs(comp_nodes);

    if (has_cycle) {
      const root = comp_nodes[0];
      hierarchies.push({ root, tree: {}, has_cycle: true });
    } else {
      const roots = comp_nodes.filter(n => indegree[n] === 0);
      const root = roots.length > 0 ? roots.sort()[0] : comp_nodes[0];
      const tree = build_tree(root);
      const depth = get_depth(tree);
      hierarchies.push({ root, tree, depth, has_cycle: false });
    }
  }

  const trees = hierarchies.filter(h => !h.has_cycle);
  const cycles = hierarchies.filter(h => h.has_cycle);

  let largest_tree_root = "";
  if (trees.length > 0) {
    let best = trees[0];
    for (const t of trees) {
      if (t.depth > best.depth || (t.depth === best.depth && t.root < best.root)) {
        best = t;
      }
    }
    largest_tree_root = best.root;
  }

  const summary = {
    total_trees: trees.length,
    total_cycles: cycles.length,
    largest_tree_root,
  };

  return res.status(200).json({
    user_id: "Dharambir_Singh_27032005",
    email_id: "dharambir1186.be23@chitkarauniversity.edu.in",
    college_roll_number: "2311981186",
    hierarchies,
    invalid_entries,
    duplicate_edges,
    summary,
  });
}
