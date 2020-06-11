const bip = require('bip');

module.exports = {

    async getInfoBip(numberBip) {
        var numbers = /^[0-9]{8}+$/;
        if (numberBip.match(numbers)) {
            return await bip(numberBip)
                .then(data => data)
                .then(info => `El saldo actual de la tarjeta bip Nº: ${numberBip} es de ${info.balance}`)
                .catch(error => {
                    console.log('Hubo un problema con la petición en la funcion getInfoBip:' + error);
                    return 'lamentablemente tenemos problemas intenta en otro momento'
                });
        } else {
            return 'Para utilizar esta funcion solo debe ingresar 8 numeros EJ: /bip 12345678'
        }

    }
}