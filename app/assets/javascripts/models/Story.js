var app = app || {};

app.Story = Backbone.Model.extend({
  urlRoot: "/stories",
  defaults: {
    content: ""
  }
});