// Generated by CoffeeScript 1.6.3
(function() {
  describe("Login", function() {
    var login, newUser, resetTracker, sampleEmail, testWindow;
    login = null;
    testWindow = null;
    sampleEmail = "foo@example.com";
    newUser = "new";
    resetTracker = function() {
      tracker.path = backupTracker.path;
      return tracker.path_refinements = backupTracker.path_refinements;
    };
    beforeEach(function() {
      var ready;
      ready = false;
      require(['../../login', 'jasmine-jquery'], function(Login) {
        Login.init();
        login = Login.instance;
        testWindow = $('<div></div>');
        ready = true;
        return loadFixtures("login.html");
      });
      return waitsFor(function() {
        return ready;
      });
    });
    describe("#_setEmail", function() {
      it("assigns the zmail", function() {
        login._setEmail(sampleEmail);
        return expect(login.my.zmail).toEqual(sampleEmail);
      });
      return it("assigns the a cookie", function() {
        login._setEmail(sampleEmail);
        return expect($.cookie('zmail')).toEqual(sampleEmail);
      });
    });
    describe("#_showRegister", function() {
      return it("doesn't hide the link", function() {
        login._showRegister();
        return expect($('a.register').parent()).not.toHaveClass('hidden');
      });
    });
    describe("#_hideRegister", function() {
      return it("hides the link", function() {
        login._hideRegister();
        return expect($('a.register').parent()).toHaveClass('hidden');
      });
    });
    describe("#_showAccount", function() {
      it("keeps the account link hidden without z_type_email", function() {
        $.cookie('z_type_email', '');
        login._showAccount();
        return expect($('a.account').parent()).toHaveClass('hidden');
      });
      return it("hides the account link when z_type_email", function() {
        $.cookie('z_type_email', 'profile');
        login._showAccount();
        return expect($('a.account').parent()).not.toHaveClass('hidden');
      });
    });
    describe("#_showLogout", function() {
      it("flips the login link class", function() {
        var loginLink;
        loginLink = $('a.login');
        login._showLogout();
        expect(loginLink).toHaveClass('logout');
        return expect(loginLink).not.toHaveClass('login');
      });
      return it("sets the login link text to Log Out", function() {
        var loginLink;
        loginLink = $('a.login');
        login._showLogout();
        return expect(loginLink).toHaveText('Log Out');
      });
    });
    describe("#_showLogin", function() {
      it("flips the login link class", function() {
        var loginLink;
        loginLink = $('a.login');
        login._showLogin();
        expect(loginLink).not.toHaveClass('logout');
        return expect(loginLink).toHaveClass('login');
      });
      return it("sets the login link text to Log In", function() {
        var loginLink;
        loginLink = $('a.logout');
        login._showLogin();
        return expect(loginLink).toHaveText('Log In');
      });
    });
    describe("#_toggleElementsWhenLoggedIn", function() {
      it("hides marked elements based on logged in state", function() {
        var elements;
        login._toggleElementsWhenLoggedIn();
        elements = $('.js_hidden_if_logged_in');
        return expect(elements).toHaveCss({
          display: 'none'
        });
      });
      return it("does not hide marked elements based on logged out state", function() {
        var elements;
        login._toggleElementsWhenLoggedIn();
        elements = $('.js_hidden_if_logged_out');
        return expect(elements).not.toHaveCss({
          display: 'none'
        });
      });
    });
    describe("#_toggleElementsWhenLoggedOut", function() {
      it("does not hide marked elements based on logged in state", function() {
        var elements;
        login._toggleElementsWhenLoggedOut();
        elements = $('.js_hidden_if_logged_out');
        return expect(elements).toHaveCss({
          display: 'none'
        });
      });
      return it("hides marked elements based on logged out state", function() {
        var elements;
        login._toggleElementsWhenLoggedOut();
        elements = $('.js_hidden_if_logged_in');
        return expect(elements).not.toHaveCss({
          display: 'none'
        });
      });
    });
    return describe("#_toggleLogIn", function() {
      var sessionName, _i, _len, _ref;
      _ref = ["temp", "perm"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sessionName = _ref[_i];
        describe("with a " + sessionName + " session", function() {
          beforeEach(function() {
            login.my.session = sessionName;
            spyOn(login, '_hideRegister');
            spyOn(login, '_showLogout');
            spyOn(login, '_showAccount');
            spyOn(login, '_toggleElementsWhenLoggedIn');
            return login._toggleLogIn();
          });
          it("hides register link", function() {
            return expect(login._hideRegister).toHaveBeenCalled();
          });
          it("shows logout", function() {
            return expect(login._showLogout).toHaveBeenCalled();
          });
          it("shows account", function() {
            return expect(login._showAccount).toHaveBeenCalled();
          });
          return it("toggles elements when logged in", function() {
            return expect(login._toggleElementsWhenLoggedIn).toHaveBeenCalled();
          });
        });
      }
      return describe("without a session", function() {
        beforeEach(function() {
          login.my.session = "";
          spyOn(login, '_showRegister');
          spyOn(login, '_showLogin');
          spyOn(login, '_toggleElementsWhenLoggedOut');
          return login._toggleLogIn();
        });
        it("shows register link", function() {
          return expect(login._showRegister).toHaveBeenCalled();
        });
        it("shows login", function() {
          return expect(login._showLogin).toHaveBeenCalled();
        });
        return it("toggles elements when logged out", function() {
          return expect(login._toggleElementsWhenLoggedOut).toHaveBeenCalled();
        });
      });
    });
  });

}).call(this);
