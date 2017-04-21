require('../Base');
require('./Service');
require('./ServicesDeleteParam');
require('./ServicesQueryParam');

SuperMap.Portal = SuperMap.Class({

    initialize: function (iportalUrl, token) {
        this.iportalUrl = iportalUrl;
        this.request = new SuperMap.Request();
        this.token = token;
    },

    load: function () {
        var me = this;
        return me.request.get(me.iportalUrl + '/web').then(function (result) {
            if (result) {
                SuperMap.Credential.CREDENTIAL = new SuperMap.Credential(me.token, 'token');
            }
        });
    },

    queryServices: function (queryParams) {
        var serviceUrl = this.iportalUrl + "/web/services";
        return this.request.get(serviceUrl, queryParams).then(function (result) {
            var services = [];
            result.content.map(function (serviceJsonObj) {
                services.push(new SuperMap.Service(serviceUrl, serviceJsonObj));
            });
            return services;
        });
    },

    deleteServices: function (params) {
        var serviceUrl = this.iportalUrl + "/web/services";
        return this.request.delete(serviceUrl, params);
    }

})

module.exports = function (url) {
    return new SuperMap.Portal(url);
};

