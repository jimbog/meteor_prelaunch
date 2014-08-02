Prospects = new Meteor.Collection("prospects");

if (Meteor.isClient) {
  Meteor.subscribe("userData");

  Template.signUp.greeting = function () {
    return "Get early access";
  };

  Template.prospects.prospectsList = function () {
    return Prospects.find();
  };

  Template.prospects.isAdmin = function () {
    return Meteor.user().admin;
  };

  Template.signUp.events({
    'submit form': function (ev, tmpl) {
      ev.preventDefault();
      newEmail = tmpl.find("#prospect-email").value
      Prospects.insert({email: newEmail});

      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log(newEmail);
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("userData", function(){
    return Meteor.users.find({_id: this.userId}, {fields: {'admin': 1}});
  });
}
