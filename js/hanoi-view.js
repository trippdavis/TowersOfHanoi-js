(function() {
  if (typeof Hanoi === 'undefined') {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $el) {
    this.selectedColumn = null;
    this.game = game;
    this.$el = $el;
    this.render();
    this.bindEvents();
  };

  View.prototype.render = function () {
    $(this.$el).html('');
    for (var j = 0; j < 3; j++) {
      var col = this.game.towers[j];
      var $tower = $("<div data-col='" + j + "' class='tower'></div>");
      for (var i = 0; i < col.length; i++) {
        var $disk = $("<div class='disk'></div>");
        $disk.css("width", (col[i] * 50) + "px");
        $tower.append($disk);
      }
      $(this.$el).append($tower);
    }
  };

  View.prototype.bindEvents = function () {
    this.$el.on("click", ".tower", (function (myEvent) {
      var $tower = $(myEvent.currentTarget);
      this.clickTower($tower);
    }).bind(this));

  };

  View.prototype.clickTower = function ($tower) {
    if (this.selectedColumn === null) {
      this.selectedColumn = $tower.data('col');
      $tower.children().last().attr('class', 'h-disk');
      $tower.children().last().effect('shake', 100);
    } else {
      var newCol = $tower.data('col');
      if (this.game.move(this.selectedColumn, newCol)) {
        this.render();
        if (this.game.isWon()) {
          alert('You won!');
          this.game = new Hanoi.Game();
          this.render();
        }
      } else {
        this.render();
        alert('Invalid move!');
      }
      this.selectedColumn = null;
    }
  };



})();
