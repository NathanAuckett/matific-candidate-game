export class Component {
    componentName;
    gameManager;
    id;
    ctx;
    x;
    y;
    width;
    height;
    constructor(gameManager, name = "") {
        this.gameManager = gameManager;
        this.componentName = name;
        this.id = gameManager.getNewID();
        this.ctx = gameManager.ctx;
        this.x = 0;
        this.y = 0;
        this.width = 10;
        this.height = 10;
    }
    step() { }
    draw() {
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
