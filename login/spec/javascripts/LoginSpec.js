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
    return describe("#_toggleLogIn", function() {
      describe("with a temp or perm session", function() {
        beforeEach(function() {
          login.my.session = "temp";
          return $.cookie('z_type_email', '');
        });
        it("hides register link", function() {
          login._toggleLogIn();
          return expect($('a.register').parent()).toHaveClass('hidden');
        });
        it("flips the login link class", function() {
          var loginLink;
          loginLink = $('a.login');
          login._toggleLogIn();
          expect(loginLink).toHaveClass('logout');
          return expect(loginLink).not.toHaveClass('login');
        });
        it("hides the account link when z_type_email", function() {
          $.cookie('z_type_email', 'profile');
          login._toggleLogIn();
          return expect($('a.account').parent()).not.toHaveClass('hidden');
        });
        it("sets the login link text to Log Out", function() {
          var loginLink;
          loginLink = $('a.login');
          login._toggleLogIn();
          return expect(loginLink).toHaveText('Log Out');
        });
        it("hides elements when they should be hidden", function() {
          var elements;
          login._toggleLogIn();
          elements = $('.js_hidden_if_logged_in');
          return expect(elements).toHaveClass('hidden');
        });
        return it("does not hide elements that should not be hidden", function() {
          var elements;
          login._toggleLogIn();
          elements = $('.js_hidden_if_logged_out');
          return expect(elements).not.toHaveClass('hidden');
        });
      });
      return describe("without a session", function() {
        beforeEach(function() {
          return login.my.session = "";
        });
        it("doesn't hide register link", function() {
          login._toggleLogIn();
          return expect($('a.register').parent()).not.toHaveClass('hidden');
        });
        it("flips the login link class", function() {
          var loginLink;
          loginLink = $('a.login');
          login._toggleLogIn();
          expect(loginLink).not.toHaveClass('logout');
          return expect(loginLink).toHaveClass('login');
        });
        it("keeps the account link hidden", function() {
          login._toggleLogIn();
          return expect($('a.account').parent()).toHaveClass('hidden');
        });
        it("sets the login link text to Log In", function() {
          var loginLink;
          loginLink = $('a.logout');
          login._toggleLogIn();
          return expect(loginLink).toHaveText('Log In');
        });
        it("does not hide elements that should be hidden", function() {
          var elements;
          login._toggleLogIn();
          elements = $('.js_hidden_if_logged_out');
          return expect(elements).toHaveClass('hidden');
        });
        return it("hides elements that should be hidden", function() {
          var elements;
          login._toggleLogIn();
          elements = $('.js_hidden_if_logged_in');
          return expect(elements).not.toHaveClass('hidden');
        });
      });
    });
  });

}).call(this);
