describe("servers", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should update server table on updateServerTable()', function () {
    updateServerTable();
    displayedServerElements = document.querySelectorAll('#serverTable tbody tr td');
    let servers = [];
    let displayedServers = [];
    for (let i = 0; i < displayedServerElements.length; i=i+2) {
      displayedServers.push(displayedServerElements[i].innerText);
    }
    for (let key in allServers) {
      servers.push(allServers.key.serverName);
    }
    expect(servers).toEqual(displayedServers);
  });

  afterEach(function() {
    // teardown logic
    serverNameInput.value = '';
    allServers = {};
    serverId = 0;
    updateServerTable();
  });
});
