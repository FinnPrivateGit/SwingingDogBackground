const dog = document.getElementById('dog');
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;

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
const ceiling = Bodies.rectangle(500, 0, 1000, 50, { isStatic: true });
const rope = Constraint.create({
    bodyA: dogBody,
    pointB: { x: 500, y: 0 },
    length: 400,
    stiffness: 0.2
});

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
});

World.add(engine.world, [dogBody, ceiling, rope, mouseConstraint]);
Engine.run(engine);
Render.run(render);

function update() {
    dog.style.left = dogBody.position.x + 'px';
    dog.style.top = dogBody.position.y + 'px';
    requestAnimationFrame(update);
}

update();