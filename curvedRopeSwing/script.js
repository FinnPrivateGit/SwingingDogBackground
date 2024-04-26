
const dog = document.getElementById('dog');
dog.style.zIndex = -1;

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

const dogBody = Bodies.rectangle(100, 100, 100, 100, { inertia: Infinity, render: { visible: false }});

// Create an array to hold the links of the rope
let ropeLinks = [];

// Create each link of the rope
for (let i = 0; i < 12; i++) {
  let y = 150 + i * 18;
  let link = this.matter.add.image(400, y, 'rope_small');
  ropeLinks.push(link);

  if (i > 0) {
    // Connect this link to the previous one
    let prevLink = ropeLinks[i - 1];
    this.matter.add.joint(prevLink, link, 35, 0.4);
  }
}

// Connect the first link to the ceiling
let firstLink = ropeLinks[0];
this.matter.add.worldConstraint(firstLink, 0, 1, {
  pointA: { x: 400, y: 50 },
  pointB: { x: 0, y: 0 }
});

// Connect the last link to the dog
let lastLink = ropeLinks[ropeLinks.length - 1];
this.matter.add.joint(lastLink, dogBody, 35, 0.4);


//create mouseconstraint
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
});

//create world
World.add(engine.world, [dog, dogBody, mouseConstraint]);
Render.run(render);
Engine.run(engine);

//updating
function update() {
    dog.style.left = dogBody.position.x - 50 + 'px';
    dog.style.top = dogBody.position.y -50 + 'px';

    for (let i = 0; i < ropeLinks.length; i++) {
        const linkElement = document.getElementById('ropeLink' + i);
        linkElement.style.left = ropeLinks[i].position.x - 50 + 'px';
        linkElement.style.top = ropeLinks[i].position.y - 50 + 'px';
    }

    requestAnimationFrame(update);
}

update();

