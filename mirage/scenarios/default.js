export default function (server) {
  window.mirage = { server: server };

  let planet = server.create('planet', { name: 'Earth' });
  server.create('moon', { planet: planet, name: 'moon' });
}
