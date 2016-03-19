// this.timer_id = foo.bar.applyInterval(1000, foo, [ hoge ]); // setInterval & apply
Function.prototype.applyTimeout = function (ms, self, args) {
  var f = this;
  return setTimeout(
    function () {
      f.apply(self, args);aa
    },
    ms);
};

Function.prototype.callTimeout = function (ms, self) {
  return this.applyTimeout(
      ms,
      self,
      Array.prototype.slice.call(arguments, 2));
};

Function.prototype.applyInterval = function (ms, self, args) {
  var f = this;
  return setInterval(
    function () {
      f.apply(self, args);
    },
    ms);
};

Function.prototype.callInterval = function (ms, self) {
  return this.applyInterval(
      ms,
      self,
      Array.prototype.slice.call(arguments, 2));
};