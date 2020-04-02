var { Support } = require("../../../clients/client-support");
var { defineSupportCode } = require("cucumber");

defineSupportCode(function({ Before, Given, Then, When }) {
  Before({ tags: "@support" }, function(scenario, callback) {
    this.service = new Support({ region: "us-east-1" });
    callback();
  });

  Given(/^I describe Support services$/, function(callback) {
    this.request(null, "describeServices", {}, callback);
  });

  Then(
    /^the Supported services list should contain a service with code "([^"]*)"$/,
    function(code, callback) {
      this.assert.contains(this.data.services, function(svc) {
        return svc.code == code;
      });
      callback();
    }
  );

  Then(
    /^the Supported services list should contain a service with name "([^"]*)"$/,
    function(name, callback) {
      this.assert.contains(this.data.services, function(svc) {
        return svc.name == name;
      });
      callback();
    }
  );

  Given(/^I create a case with an invalid category$/, function(callback) {
    var params = {
      subject: "Subject",
      serviceCode: "INVALID-CODE",
      categoryCode: "INVALID-CATEGORY",
      communicationBody: "Communication"
    };

    this.request(null, "createCase", params, callback, false);
  });
});
