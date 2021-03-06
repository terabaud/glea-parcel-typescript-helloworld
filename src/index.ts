import GLea from "glea";
import vert from "./vert.glsl";
import frag from "./frag.glsl";

const glea = new GLea({
  shaders: [GLea.fragmentShader(frag), GLea.vertexShader(vert)],
  buffers: {
    // create a position attribute bound
    // to a buffer with 4 2D coordinates
    // this is what GLea provides by default if you omit buffers in the constructor
    position: GLea.buffer(2, [1, 1, -1, 1, 1, -1, -1, -1])
  }
}).create();

function loop(time: number): void {
  const { gl, width, height } = glea;
  glea.clear();
  glea.uniV("resolution", [width, height]);
  glea.uni("time", time * 1e-3);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  requestAnimationFrame(loop);
}

function setup(): void {
  window.addEventListener("resize", () => {
    glea.resize();
  });
  loop(0);
}

setup();
