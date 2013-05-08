function Unit(type,sprite, spriteW, spriteH, spriteFrames, x, y) {
    this.type = type;
    this.damage = type.damage;
    this.health = type.health;
    this.x = x;
    this.y = y;
    this.height = 5;
    this.width = 5;
    this.image = sprite;
    this.state = 0;
    this.takeDamage = function (damage) {
        this.heath = this.health - damage;
    };
    this.draw = function (ctx) {
        ctx.drawImage(this.image, 0 + this.state, 0, spriteW, spriteH, this.x, this.y, spriteW, spriteH);
        this.x += this.type.speed * this.type.direction;

        if(this.x % 20 == 0)
        {
            this.state += spriteW;
        }
        if (this.x > 500) {
            this.x = 0;
        }
        if (this.x < 0) {
            this.x = 500;
        }
        if (this.state > spriteW * (spriteFrames-1)) {
            this.state = 0
        }
    }
}
