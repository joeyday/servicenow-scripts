// Directly accessing GlideRecord elements gives you Java native types,
// and GlideRecord's getValue() method always returns JavaScript strings.
// Neither is very helpful! Using GlideQuery is the recommended best
// practice, but sometimes you are forced to work with GlideRecord
// objects, e.g. the `current` object in Business Rules.
// 
// BetterGetter's getValue method returns the correct JavaScript native
// type based on the data type of an element's dictionary entry. BetterGetter
// also provides convenient methods for converting an element to any other
// preferred JavaScript native type, if possible.
// 
// Use it like this:
//    var active = new BetterGetter(current).getValue('active');
// 
// Or like this:
//    var getter = new BetterGetter(current);
//    var active = getter.getValue('active');

function BetterGetter(gr) {
  // In case caller omits the new keyword
  if (!(this instanceof BetterGetter)) return new BetterGetter(gr);
  this._gr = gr;
}

BetterGetter.prototype.getValue = function(element) {
  switch (this._gr[element].getED().getInternalType() + '') {
    case 'boolean':
      return this.getBoolean(element);
    case 'glide_date':
      return this.getDate(element);
    case 'glide_date_time':
      return this.getDateTime(element);
    case 'glide_list':
      return this.getList(element);
    case 'decimal':
    case 'float':
    case 'integer':
    case 'longint':
    case 'long':
    case 'numeric':
      return this.getNumber(element);
    default:
      return this.getString(element);
  }
};

BetterGetter.prototype.getBoolean = function(element) {
  return Boolean(this._gr[element]);
};

BetterGetter.prototype.getDate = function(element) {
  return (this._gr[element] + '').slice(0, 10) || null;
};

BetterGetter.prototype.getDateTime = function(element) {
  return this._gr[element] + '' || null;
};

BetterGetter.prototype.getList = function(element) {
  if (this._gr[element].nil()) return null;
  return (this._gr[element] + '').split(',');
};

BetterGetter.prototype.getListDisplay = function(element) {
  if (this._gr[element].nil()) return null;
  return (this._gr.getDisplayValue(element)).split(',');
};

BetterGetter.prototype.getNumber = function(element) {
  if (this._gr[element].nil()) return null;
  return Number(this._gr[element]);
};

BetterGetter.prototype.getString = function(element) {
  return this._gr[element] + '' || null;
};