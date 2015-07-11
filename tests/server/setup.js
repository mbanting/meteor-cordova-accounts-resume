if (Meteor.users.findOne({username: "test"}) == null) {
    Meteor.wrapAsync(Accounts.createUser({username: "test", password: "test"}));
}
