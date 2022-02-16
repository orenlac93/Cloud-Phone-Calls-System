function customer(name,id,bod,address,gender,subscriptions) {       // Accept name and age in the constructor
    this.name = name || null;
    this.age = age || null;
    this.bod = bod || null;
    this.address = address || null;
    this.gender = gender || null;
    this.subscriptions = subscriptions || null;
}

customer.prototype.getName() = function () {
    return this.name;
}

customer.prototype.getId() = function () {
    return this.Id;
}

customer.prototype.getBod() = function () {
    return this.Bod;
}

customer.prototype.getAddress() = function () {
    return this.address;
}

customer.prototype.getGender() = function () {
    return this.gender;
}

customer.prototype.getSubs() = function () {
    return this.subscriptions;
}