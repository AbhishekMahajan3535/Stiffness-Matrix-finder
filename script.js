function calculateMatrix() {
    const x1 = parseFloat(document.getElementById("x1").value);
    const y1 = parseFloat(document.getElementById("y1").value);
    const x2 = parseFloat(document.getElementById("x2").value);
    const y2 = parseFloat(document.getElementById("y2").value);
    const x3 = parseFloat(document.getElementById("x3").value);
    const y3 = parseFloat(document.getElementById("y3").value);
    const i = parseInt(document.getElementById("condition").value);
    const u = parseFloat(document.getElementById("u").value);
    const E = parseFloat(document.getElementById("E").value);
    const t = parseFloat(document.getElementById("t").value);
    const b1 = y2 - y3, b2 = y3 - y1, b3 = y1 - y2;
    const c1 = x3 - x2, c2 = x1 - x3, c3 = x2 - x1;
    const B = [
      [b1, 0, b2, 0, b3, 0],
      [0, c1, 0, c2, 0, c3],
      [c1, b1, c2, b2, c3, b3]
    ];
    const Bt = [
      [b1, 0, c1], [0, c1, b1],
      [b2, 0, c2], [0, c2, b2],
      [b3, 0, c3], [0, c3, b3]
    ];
    const area = 0.5 * Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
    if (area === 0) {
      document.getElementById("matrix-output").innerText = "Invalid triangle (area is zero).";
      return;
    }
    let factor, D = [];
    if (i === 1) {
      factor = E / (1 - u * u);
      D = [
        [1, u, 0],
        [u, 1, 0],
        [0, 0, (1 - u) / 2]
      ];
    } else if (i === 2) {
      factor = (E * (1 - u)) / ((1 + u) * (1 - 2 * u));
      D = [
        [1, u / (1 - u), 0],
        [u / (1 - u), 1, 0],
        [0, 0, (1 - 2 * u) / (2 * (1 - u))]
      ];
    } else {
      document.getElementById("matrix-output").innerText = "Enter valid condition (1 or 2).";
      return;
    }
    for (let m = 0; m < 3; m++) {
      for (let n = 0; n < 3; n++) {
        D[m][n] *= factor;
      }
    }
    const DB = Array.from({ length: 3 }, () => Array(6).fill(0));
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 6; j++) {
        for (let k = 0; k < 3; k++) {
          DB[i][j] += D[i][k] * B[k][j];
        }
      }
    }
    const K = Array.from({ length: 6 }, () => Array(6).fill(0));
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        for (let k = 0; k < 3; k++) {
          K[i][j] += Bt[i][k] * DB[k][j];
        }
      }
    }
    let html = `<h3 class="text-xl font-semibold mb-4">Stiffness Matrix K</h3>
    <table class="table-auto border border-collapse border-gray-700"><tbody>`;
    for (let i = 0; i < 6; i++) {
      html += "<tr>";
      for (let j = 0; j < 6; j++) {
        html += `<td class="border px-4 py-2">${(0.25 * t / area * K[i][j]).toFixed(3)}</td>`;
      }
      html += "</tr>";
    }
    html += `</tbody></table>`;
    document.getElementById("matrix-output").innerHTML = html;

}