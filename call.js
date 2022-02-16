function call(period, time, city, gender, age, numOfPrevCalls, product, topic) {
    this.period = period || null;
    this.time = time || null;
    this.city = city || null;
    this.gender = gender || null;
    this.age = age || null;
    this.numOfPrevCalls = numOfPrevCalls || null;
    this.product = product || null;
    this.topic = topic || null;
}

call.prototype.getPeriod() = function () {
    return this.period;
}

call.prototype.getTime() = function () {
    return this.time;
}

call.prototype.getCity() = function () {
    return this.city;
}

call.prototype.getGender() = function () {
    return this.gender;
}
call.prototype.getAge() = function () {
    return this.age;
}

call.prototype.getNumOfPrevCalls() = function () {
    return this.numOfPrevCalls;
}

call.prototype.getProduct() = function () {
    return this.product;
}

call.prototype.getTopic() = function () {
    return this.topic;
}