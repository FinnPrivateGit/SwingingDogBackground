const dog = document.getElementById('dog');
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

const engine = Engine.create();
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
    }
});

const dogBody = Bodies.rectangle(100, 100, 100, 100, { inertia: Infinity });
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
});

World.add(engine.world, [dogBody, mouseConstraint]);
Engine.run(engine);
Render.run(render);

function update() {
    dog.style.left = dogBody.position.x + 'px';
    dog.style.top = dogBody.position.y + 'px';
    requestAnimationFrame(update);
}

update();