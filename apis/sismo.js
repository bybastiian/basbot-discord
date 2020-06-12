module.exports = {
  async getEarthQuake(location) {
    if (location) {
      return await fetch(
        `${URL_WEATHER}${location},cl&lang=ES&units=metric&&APPID=${TOKEN_WEATHER}`
      )
        .then((response) => response.json())
        .then(
          (contenido) =>
            `Actualmente la temperatura en ${contenido.name} es de: ${contenido.main.temp}℃`
        )
        .catch((error) => {
          console.log(
            "Hubo un problema con la petición Fetch de getWeather:" +
              error.message
          );
          return "lamentablemente la localizacion ingresada no es valida";
        });
    } else {
      return "al parecer no puedo buscar la temperatura un ejemplo de como usarla seria /clima maipu";
    }
  },
};
