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

const rope = Constraint.create({
    bodyA: dogBody,
    pointA: { x: 0, y: 0 },
    pointB: { x: window.innerWidth / 2, y: 0 },
    stiffness: 0.05
});

World.add(engine.world, [dogBody, rope]);
Render.run(render);
Engine.run(engine);

// Update the position of the rope
setInterval(function() {
    const ropeElement = document.getElementById('rope');
    ropeElement.style.top = dogBody.position.y + 'px';
    ropeElement.style.left = dogBody.position.x + 'px';
}, 1000 / 60);