(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n(43)},22:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(10),l=n.n(r),i=(n(22),n(11)),u=n(12),c=n(14),m=n(13),s=n(15),p=function(e){var t=e.person,n=e.removePerson;return o.a.createElement("li",null,t.name,": ",t.number,o.a.createElement("button",{onClick:n},"poista"))},h=function(e){var t=e.nameChange,n=e.numberChange,a=e.state;return o.a.createElement("div",null,o.a.createElement("div",null,"nimi:",o.a.createElement("input",{value:a.newName,onChange:t})),o.a.createElement("div",null,"numero:",o.a.createElement("input",{value:a.newNumber,onChange:n})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},f=n(2),v=n.n(f),d="/api/people",b={getAll:function(){return v.a.get(d).then(function(e){return e.data})},create:function(e){return v.a.post(d,e)},update:function(e,t){return v.a.put("".concat(d,"/").concat(e),t)},remove:function(e){return v.a.delete("".concat(d,"/").concat(e))}},g=function(e){var t=e.message;return null===t?null:o.a.createElement("div",{className:"notification"},t)},E=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).addPerson=function(t){t.preventDefault();for(var n=!1,a=0;a<e.state.people.length;a++)e.state.people[a].name===e.state.newName&&(n=!0);if(!0===n)alert("Nimi on jo luettelossa");else{var o={name:e.state.newName,number:e.state.newNumber};b.create(o).then(function(t){e.setState({people:e.state.people.concat(t.data),newName:"",newNumber:"",notification:"Lis\xe4ttiin henkil\xf6 ".concat(o.name)}),setTimeout(function(){e.setState({notification:null})},5e3)}),console.log("lis\xe4t\xe4\xe4n henkil\xf6")}},e.removePerson=function(e){return function(){window.confirm("Poistetaanko henkil\xf6?")&&(console.log("poisto"),b.remove(e))}},e.handleNameChange=function(t){e.setState({newName:t.target.value})},e.handleNumberChange=function(t){e.setState({newNumber:t.target.value})},e.state={people:[],newName:"",newNumber:"",notification:null},e}return Object(s.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.getAll().then(function(t){e.setState({people:t})})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement("h2",null,"Puhelinluettelo"),o.a.createElement(g,{message:this.state.notification}),o.a.createElement("form",{onSubmit:this.addPerson},o.a.createElement(h,{nameChange:this.handleNameChange,numberChange:this.handleNumberChange,state:this.state})),o.a.createElement("h2",null,"Numerot"),o.a.createElement("ul",null,this.state.people.map(function(t){return o.a.createElement(p,{key:t.name,person:t,removePerson:e.removePerson(t.id)})})))}}]),t}(o.a.Component);l.a.render(o.a.createElement(E,null),document.getElementById("root"))}},[[16,2,1]]]);
//# sourceMappingURL=main.067c4d72.chunk.js.map