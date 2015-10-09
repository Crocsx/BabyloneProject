//Lecture des keys

var Key = {
  _down: {},
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
  SHIFT: 16,
  ENTER: 13,
  ESC: 27,
  BACKSPACE: 8,
  TAB: 9,
  CTRL: 17,
  ALT:  18,
  BREAK:  19,
  CAPSLOCK: 20,
  PAGEUP: 33,
  PAGEDOWN: 34,
  END: 35,
  HOME: 36,
  INSERT: 45,
  DELETE: 46,
  N0: 48,
  N1: 49,
  N2: 50,
  N3: 51,
  N4: 52,
  N5: 53,
  N6: 54,
  N7: 55,
  N8: 56,
  N9: 57,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  LEFTWINKEY: 91,
  RIGHTWINKEY: 92,
  SELECT: 93,
  NUM0: 96,
  NUM1: 97,
  NUM2: 98,
  NUM3: 99,
  NUM4: 100,
  NUM5: 101,
  NUM6: 102,
  NUM7: 103,
  NUM8: 104,
  NUM9: 105,
  MULTIPLY: 106,
  ADD: 107,
  SUBSTRACT: 109,
  DECIMAL: 110,
  DIVIDE: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NUMLOCK: 144,
  SCROLLLOCK: 145,
  SEMICOLON: 186,
  EQUALSIGN: 187,
  COMMA: 188,
  DASH: 189,
  PERIOD: 190,
  FORWARDSLASH: 191,
  GRAVEACCENT: 192,
  OPENBRACKET: 219,
  BACKSLASH: 220,
  CLOSEBRACKET: 221,
  SINGLEQUOTE: 222,
   
  isDown: function(keyCode) {
    return this._down[keyCode];
  },

  isPressed: function(keyCode) {
    var tosend = this._pressed[keyCode];
    this._pressed[keyCode] = false;
    return tosend;
  },
  
  onKeydown: function(event) {
    this._down[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._down[event.keyCode];
    this._pressed[event.keyCode] = true;
  },

   getAxisX: function(){
        var axis = 0;
        if ((this.isDown(Key.Q) || this.isDown(Key.LEFT)))
            axis -= 1;
        if ((this.isDown(Key.D) || this.isDown(Key.RIGHT)))
            axis += 1;
        return axis;
   },

   getAxisY: function(){
    var axis = 0;
    if ((this.isDown(Key.Z) || this.isDown(Key.TOP)))
        axis += 1;
    if ((this.isDown(Key.S) || this.isDown(Key.DOWN)))
        axis -= 1;
    return axis;
   }
};
                    
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
