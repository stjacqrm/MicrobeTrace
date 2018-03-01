data.links.forEach(l => l.mst = false);
data.links.sort((a, b) => a.distance - b.distance);
data.links[0].mst = true;
let nodes_in_tree = [data.links[0].source.id, data.links[0].target.id],
    n = data.links.length;
while(nodes_in_tree.length < data.nodes.length){
  for(let i = 0; i < n; i++){
    let link = data.links[i];
    if(nodes_in_tree.includes(link.source.id) && !nodes_in_tree.includes(link.target.id)){
      nodes_in_tree.push(link.target.id);
      link.mst = true;
      break;
    }
    if(nodes_in_tree.includes(link.target.id) && !nodes_in_tree.includes(link.source.id)){
      nodes_in_tree.push(link.source.id);
      link.mst = true;
      break;
    }
  });
}
electron.ipcRenderer.send('update-data', data);
electron.remote.getCurrentWindow().close();
