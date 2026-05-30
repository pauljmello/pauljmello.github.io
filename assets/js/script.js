(function () {
    var menuIcon = document.getElementById('menu-icon');
    var navLinks = document.getElementById('nav-links');
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', function () {
            navLinks.classList.toggle('show-menu');
        });
    }
})();

(function () {
    var colorDepth = window.screen.colorDepth || 24;
    var lowResolution = window.screen.width < 1280 || window.screen.height < 720;
    var lowColorDepth = colorDepth < 24;
    if (lowResolution || lowColorDepth) {
        document.body.classList.add('high-contrast');
    }
})();

(function () {
    // Each template is a function returning an SVG string with a unique gradient id.
    // 400x120 viewBox, blue-gradient background, white/translucent foreground geometry.
    function bg(uid) {
        return '<defs><linearGradient id="g' + uid + '" x1="0" y1="0" x2="1" y2="1">' +
               '<stop offset="0" stop-color="#0a3d6b"/><stop offset="1" stop-color="#007acc"/>' +
               '</linearGradient></defs><rect width="400" height="120" fill="url(#g' + uid + ')"/>';
    }

    var TEMPLATES = {
        nodes: function (uid) {
            // 3-layer MLP: 4 input, 7 hidden, 3 output — denser hidden, fully connected
            var layers = [
                { x: 70,  ys: [25, 50, 75, 100] },
                { x: 200, ys: [18, 32, 46, 60, 74, 88, 102] },
                { x: 330, ys: [40, 60, 80] }
            ];
            var s = '<g stroke="#fff" stroke-width="0.7" opacity="0.32" fill="none">';
            for (var c = 0; c < layers.length - 1; c++) {
                for (var i = 0; i < layers[c].ys.length; i++) {
                    for (var j = 0; j < layers[c + 1].ys.length; j++) {
                        s += '<line x1="' + layers[c].x + '" y1="' + layers[c].ys[i] + '" x2="' + layers[c + 1].x + '" y2="' + layers[c + 1].ys[j] + '"/>';
                    }
                }
            }
            s += '</g>';
            for (var l = 0; l < layers.length; l++) {
                for (var k = 0; k < layers[l].ys.length; k++) {
                    s += '<circle cx="' + layers[l].x + '" cy="' + layers[l].ys[k] + '" r="5" fill="#fff" opacity="0.95"/>';
                }
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        waves: function (uid) {
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
                bg(uid) +
                '<g fill="none" stroke="#fff" stroke-width="2">' +
                '<path d="M 0 60 Q 50 20, 100 60 T 200 60 T 300 60 T 400 60" opacity="0.9"/>' +
                '<path d="M 0 75 Q 50 35, 100 75 T 200 75 T 300 75 T 400 75" opacity="0.55"/>' +
                '<path d="M 0 45 Q 50 5, 100 45 T 200 45 T 300 45 T 400 45" opacity="0.35"/>' +
                '</g></svg>';
        },
        patches: function (uid) {
            // 4 × 7 grid, centered with ~66px padding on each side
            var nCols = 7, nRows = 4;
            var w = 28, h = 22, gapX = 12, gapY = 5;
            var totalW = nCols * w + (nCols - 1) * gapX;
            var startX = (400 - totalW) / 2;
            var rects = '';
            for (var i = 0; i < nRows; i++) {
                for (var j = 0; j < nCols; j++) {
                    var x = startX + j * (w + gapX);
                    var y = 10 + i * (h + gapY);
                    var op = 0.25 + (((i + j) % 3) * 0.25);
                    rects += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#fff" opacity="' + op.toFixed(2) + '" rx="2"/>';
                }
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
                bg(uid) + rects + '</svg>';
        },
        gauss: function (uid) {
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
                bg(uid) +
                '<path d="M 30 105 C 100 105, 130 30, 200 30 C 270 30, 300 105, 370 105 L 370 110 L 30 110 Z" fill="#fff" opacity="0.25"/>' +
                '<path d="M 30 105 C 100 105, 130 30, 200 30 C 270 30, 300 105, 370 105" fill="none" stroke="#fff" stroke-width="2"/>' +
                '<line x1="30" y1="105" x2="370" y2="105" stroke="#fff" stroke-width="1" opacity="0.7"/>' +
                '<line x1="200" y1="105" x2="200" y2="30" stroke="#fff" stroke-width="1" opacity="0.4" stroke-dasharray="3,3"/>' +
                '</svg>';
        },
        topology: function (uid) {
            // Torus / donut outline — iconic topological object
            var s = '';
            var cx = 200, cy = 60;
            var outerRx = 100, outerRy = 38;
            var holeRx = 38, holeRy = 10;
            // Soft donut fill (outer minus inner) using even-odd rule
            s += '<path fill-rule="evenodd" d="' +
                'M ' + (cx - outerRx) + ' ' + cy + ' a ' + outerRx + ' ' + outerRy + ' 0 1 0 ' + (2 * outerRx) + ' 0 a ' + outerRx + ' ' + outerRy + ' 0 1 0 ' + (-2 * outerRx) + ' 0 ' +
                'M ' + (cx - holeRx) + ' ' + cy + ' a ' + holeRx + ' ' + holeRy + ' 0 1 0 ' + (2 * holeRx) + ' 0 a ' + holeRx + ' ' + holeRy + ' 0 1 0 ' + (-2 * holeRx) + ' 0' +
                '" fill="#fff" opacity="0.2"/>';
            // Outer ring
            s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + outerRx + '" ry="' + outerRy + '" fill="none" stroke="#fff" stroke-width="2.2" opacity="0.92"/>';
            // Inner hole
            s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + holeRx + '" ry="' + holeRy + '" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.85"/>';
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        stack: function (uid) {
            // Vertical bars (was horizontal) — staircased heights, centered group
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
                bg(uid) +
                '<g fill="#fff">' +
                '<rect x="80"  y="22"  width="50" height="83" rx="3" opacity="0.95"/>' +
                '<rect x="148" y="42"  width="50" height="63" rx="3" opacity="0.7"/>' +
                '<rect x="216" y="62"  width="50" height="43" rx="3" opacity="0.5"/>' +
                '<rect x="284" y="82"  width="50" height="23" rx="3" opacity="0.3"/>' +
                '</g></svg>';
        },
        tokens: function (uid) {
            // 7 token blocks, centered with ~70px padding each side
            var widths = [32, 22, 44, 20, 38, 26, 42];
            var gap = 6;
            var totalW = widths.reduce(function (a, b) { return a + b; }, 0) + (widths.length - 1) * gap;
            var x = (400 - totalW) / 2;
            var blocks = '';
            for (var k = 0; k < widths.length; k++) {
                var op = 0.4 + ((k % 4) * 0.15);
                blocks += '<rect x="' + x + '" y="48" width="' + widths[k] + '" height="24" fill="#fff" opacity="' + op.toFixed(2) + '" rx="3"/>';
                x += widths[k] + gap;
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
                bg(uid) + blocks + '</svg>';
        },
        categorical: function (uid) {
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
                bg(uid) +
                '<g fill="none" stroke="#fff" stroke-width="1.5">' +
                '<rect x="50" y="35" width="60" height="50" rx="6"/>' +
                '<rect x="170" y="35" width="60" height="50" rx="6"/>' +
                '<rect x="290" y="35" width="60" height="50" rx="6"/>' +
                '<line x1="110" y1="60" x2="165" y2="60" stroke-dasharray="0"/>' +
                '<polygon points="165,60 157,56 157,64" fill="#fff" stroke="none"/>' +
                '<line x1="230" y1="60" x2="285" y2="60"/>' +
                '<polygon points="285,60 277,56 277,64" fill="#fff" stroke="none"/>' +
                '<path d="M 80 35 Q 200 5, 320 35" stroke-dasharray="4,3" opacity="0.6"/>' +
                '<polygon points="320,35 312,32 314,40" fill="#fff" opacity="0.6" stroke="none"/>' +
                '</g>' +
                '<g fill="#fff" font-family="Helvetica" font-size="14" text-anchor="middle">' +
                '<text x="80" y="65">A</text><text x="200" y="65">B</text><text x="320" y="65">C</text>' +
                '</g></svg>';
        },
        lattice: function (uid) {
            var dots = '';
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 11; j++) {
                    var x = 30 + j * 34;
                    var y = 18 + i * 28;
                    var op = 0.45 + ((i + j) % 3) * 0.18;
                    dots += '<circle cx="' + x + '" cy="' + y + '" r="3" fill="#fff" opacity="' + op.toFixed(2) + '"/>';
                }
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
                bg(uid) + dots + '</svg>';
        },
        bars: function (uid) {
            // 8 bars with generous side padding (~70px each side)
            var heights = [28, 42, 36, 54, 50, 70, 65, 85];
            var n = heights.length;
            var barW = 22, gap = 12;
            var totalW = n * barW + (n - 1) * gap;   // 8*22 + 7*12 = 260
            var startX = (400 - totalW) / 2;          // 70
            var s = '';
            for (var k = 0; k < n; k++) {
                var x = startX + k * (barW + gap);
                var h = heights[k];
                var op = 0.5 + k * 0.055;
                s += '<rect x="' + x + '" y="' + (108 - h) + '" width="' + barW + '" height="' + h + '" fill="#fff" opacity="' + op.toFixed(2) + '" rx="2"/>';
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        dots: function (uid) {
            var positions = [
                [50, 30], [85, 75], [120, 25], [155, 60], [180, 100], [210, 35],
                [245, 70], [280, 45], [310, 95], [340, 30], [370, 75], [70, 95],
                [140, 90], [195, 80], [265, 25], [325, 65], [40, 60], [105, 50]
            ];
            var dots = '';
            for (var k = 0; k < positions.length; k++) {
                var p = positions[k];
                var op = 0.5 + (k % 4) * 0.13;
                var r = 3 + (k % 3);
                dots += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" fill="#fff" opacity="' + op.toFixed(2) + '"/>';
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
                bg(uid) + dots + '</svg>';
        },
        tree: function (uid) {
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
                bg(uid) +
                '<g stroke="#fff" stroke-width="1.2" opacity="0.5" fill="none">' +
                '<line x1="200" y1="20" x2="100" y2="58"/>' +
                '<line x1="200" y1="20" x2="200" y2="58"/>' +
                '<line x1="200" y1="20" x2="300" y2="58"/>' +
                '<line x1="100" y1="58" x2="50" y2="98"/>' +
                '<line x1="100" y1="58" x2="150" y2="98"/>' +
                '<line x1="200" y1="58" x2="200" y2="98"/>' +
                '<line x1="300" y1="58" x2="250" y2="98"/>' +
                '<line x1="300" y1="58" x2="350" y2="98"/>' +
                '</g>' +
                '<g fill="#fff">' +
                '<circle cx="200" cy="20" r="7"/>' +
                '<circle cx="100" cy="58" r="6"/><circle cx="200" cy="58" r="6"/><circle cx="300" cy="58" r="6"/>' +
                '<circle cx="50" cy="98" r="5"/><circle cx="150" cy="98" r="5"/><circle cx="200" cy="98" r="5"/><circle cx="250" cy="98" r="5"/><circle cx="350" cy="98" r="5"/>' +
                '</g></svg>';
        },
        attention: function (uid) {
            // 3 multi-head attention patterns (diagonal · single-token · causal-forward)
            var heads = '';
            var startX = [85, 175, 265];
            for (var h = 0; h < 3; h++) {
                var ox = startX[h];
                for (var i = 0; i < 5; i++) {
                    for (var j = 0; j < 5; j++) {
                        var intensity;
                        if (h === 0) intensity = Math.exp(-Math.abs(i - j) * 0.6);
                        else if (h === 1) intensity = (j === 2) ? 0.9 : 0.25;
                        else intensity = (j > i) ? 0.75 : 0.2;
                        var op = 0.18 + intensity * 0.65;
                        heads += '<rect x="' + (ox + j * 14) + '" y="' + (20 + i * 14) + '" width="11.5" height="11.5" fill="#fff" opacity="' + op.toFixed(2) + '" rx="1"/>';
                    }
                }
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + heads + '</svg>';
        },
        embeddings: function (uid) {
            // Irregular t-SNE-style atlas: 4 different-sized clusters + faint semantic links
            var s = '';
            var clusters = [
                { cx: 75,  cy: 35, n: 7, scale: 1.0 },
                { cx: 175, cy: 75, n: 11, scale: 1.4 },
                { cx: 305, cy: 38, n: 8, scale: 1.15 },
                { cx: 290, cy: 90, n: 6, scale: 0.85 }
            ];
            // Faint semantic-link dashes between near-by clusters
            s += '<g stroke="#fff" stroke-width="0.7" opacity="0.3" fill="none" stroke-dasharray="3,3">';
            s += '<path d="M 175 75 Q 240 60, 305 38"/>';
            s += '<path d="M 175 75 Q 230 80, 290 90"/>';
            s += '<path d="M 305 38 Q 300 65, 290 90"/>';
            s += '</g>';
            for (var ci = 0; ci < clusters.length; ci++) {
                var c = clusters[ci];
                for (var k = 0; k < c.n; k++) {
                    var ang = (k / c.n) * Math.PI * 2 + ci * 0.75;
                    var r = (3 + (k % 4) * 4.5) * c.scale;
                    var x = c.cx + r * Math.cos(ang) * 1.55;
                    var y = c.cy + r * Math.sin(ang);
                    var dotR = 2.4 + (k % 2);
                    var op = 0.55 + (k % 3) * 0.13;
                    s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + dotR + '" fill="#fff" opacity="' + op.toFixed(2) + '"/>';
                }
                // Cluster centroid marker
                s += '<circle cx="' + c.cx + '" cy="' + c.cy + '" r="2" fill="#fff" opacity="0.85"/>';
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        gradient: function (uid) {
            // SGD on contour plot — concentric elliptical contours + zigzag descent
            var s = '<g fill="none" stroke="#fff" stroke-width="1">';
            s += '<ellipse cx="290" cy="60" rx="105" ry="42" opacity="0.28"/>';
            s += '<ellipse cx="290" cy="60" rx="78" ry="31" opacity="0.4"/>';
            s += '<ellipse cx="290" cy="60" rx="52" ry="21" opacity="0.55"/>';
            s += '<ellipse cx="290" cy="60" rx="26" ry="11" opacity="0.7"/>';
            s += '</g>';
            // Minimum
            s += '<circle cx="290" cy="60" r="4.5" fill="#fff"/>';
            // Zigzag descent path
            var traj = [
                { x: 60, y: 25 }, { x: 95, y: 48 }, { x: 130, y: 38 },
                { x: 165, y: 70 }, { x: 205, y: 55 }, { x: 240, y: 72 },
                { x: 270, y: 58 }, { x: 288, y: 60 }
            ];
            for (var i = 1; i < traj.length; i++) {
                var pp = traj[i - 1], p = traj[i];
                s += '<line x1="' + pp.x + '" y1="' + pp.y + '" x2="' + p.x + '" y2="' + p.y + '" stroke="#fff" stroke-width="1.5" opacity="' + (0.4 + i * 0.06).toFixed(2) + '"/>';
            }
            for (var j = 0; j < traj.length; j++) {
                s += '<circle cx="' + traj[j].x + '" cy="' + traj[j].y + '" r="3" fill="#fff" opacity="' + (0.5 + j * 0.06).toFixed(2) + '"/>';
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        score: function (uid) {
            // Score-function vector field: arrows pointing toward density center (∇ log p)
            var s = '';
            var cx = 200, cy = 60;
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 9; j++) {
                    var x = 40 + j * 40;
                    var y = 18 + i * 28;
                    var dx = cx - x, dy = cy - y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 28) continue;
                    var ux = dx / dist, uy = dy / dist;
                    var ex = x + ux * 11, ey = y + uy * 11;
                    var op = 0.4 + Math.min(1, 50 / dist) * 0.4;
                    s += '<line x1="' + x + '" y1="' + y + '" x2="' + ex.toFixed(1) + '" y2="' + ey.toFixed(1) + '" stroke="#fff" stroke-width="1.2" opacity="' + op.toFixed(2) + '"/>';
                    s += '<circle cx="' + ex.toFixed(1) + '" cy="' + ey.toFixed(1) + '" r="1.6" fill="#fff" opacity="' + op.toFixed(2) + '"/>';
                }
            }
            s += '<circle cx="200" cy="60" r="5" fill="#fff"/>';
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        kl: function (uid) {
            // Two overlapping Gaussians — KL divergence between P and Q
            var s = '';
            s += '<path d="M 20 100 Q 90 100, 110 60 Q 130 20, 150 20 Q 170 20, 190 60 Q 210 100, 280 100" fill="#fff" opacity="0.25"/>';
            s += '<path d="M 20 100 Q 90 100, 110 60 Q 130 20, 150 20 Q 170 20, 190 60 Q 210 100, 280 100" fill="none" stroke="#fff" stroke-width="2" opacity="0.85"/>';
            s += '<path d="M 120 100 Q 190 100, 210 70 Q 230 35, 250 35 Q 270 35, 290 70 Q 310 100, 380 100" fill="#fff" opacity="0.18"/>';
            s += '<path d="M 120 100 Q 190 100, 210 70 Q 230 35, 250 35 Q 270 35, 290 70 Q 310 100, 380 100" fill="none" stroke="#fff" stroke-width="2" opacity="0.6" stroke-dasharray="5,3"/>';
            s += '<line x1="15" y1="102" x2="385" y2="102" stroke="#fff" stroke-width="0.8" opacity="0.5"/>';
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        bottleneck: function (uid) {
            // Information bottleneck — hourglass narrowing then expanding
            var s = '';
            s += '<path d="M 30 20 L 30 100 L 180 65 L 180 55 Z" fill="#fff" opacity="0.4"/>';
            s += '<path d="M 370 20 L 370 100 L 220 65 L 220 55 Z" fill="#fff" opacity="0.4"/>';
            s += '<rect x="180" y="54" width="40" height="12" fill="#fff" opacity="0.85"/>';
            s += '<circle cx="200" cy="60" r="3" fill="#fff"/>';
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        eigenvalues: function (uid) {
            // Wigner semicircle law (RMT) — histogram bars whose envelope matches the curve
            var s = '';
            // The semicircle envelope (dashed for reference)
            s += '<path d="M 50 100 A 150 65 0 0 1 350 100" fill="none" stroke="#fff" stroke-width="1.4" opacity="0.55" stroke-dasharray="5,3"/>';
            // Histogram bars under the envelope
            var nBars = 22;
            for (var i = 0; i < nBars; i++) {
                var x = 55 + (i / (nBars - 1)) * 290;
                var u = (x - 200) / 150;
                if (Math.abs(u) >= 1) continue;
                var maxH = 65 * Math.sqrt(1 - u * u);
                // Slight statistical noise above/below envelope for realism
                var h = maxH * (0.78 + 0.15 * Math.sin(i * 3.7) * Math.cos(i * 1.3));
                var barW = 11;
                var op = 0.55 + ((i % 3) * 0.13);
                s += '<rect x="' + (x - barW / 2).toFixed(1) + '" y="' + (100 - h).toFixed(1) + '" width="' + barW + '" height="' + h.toFixed(1) + '" fill="#fff" opacity="' + op.toFixed(2) + '" rx="1"/>';
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        scaling: function (uid) {
            // Exponential growth — nearly flat at left, sharp acceleration upward at right
            var s = '';
            // Exponential curve y = e^x (mapped to viewbox); subtle fill
            s += '<path d="M 30 102 C 120 100, 200 90, 260 65 C 305 45, 340 25, 370 12 L 370 110 L 30 110 Z" fill="#fff" opacity="0.13"/>';
            s += '<path d="M 30 102 C 120 100, 200 90, 260 65 C 305 45, 340 25, 370 12" fill="none" stroke="#fff" stroke-width="2.6" opacity="0.95"/>';
            // Linear reference for contrast
            s += '<line x1="30" y1="102" x2="370" y2="60" stroke="#fff" stroke-width="1.8" opacity="0.4" stroke-dasharray="6,4"/>';
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        conv: function (uid) {
            // Three progressively-downsampled grids — packed tighter and centered horizontally
            // Layout widths: big=73, mid=62, small=55. Gaps=15. Total=220. Start x=90.
            var s = '';
            // Big grid (5x5) — x: 90 to 163, y centered around 60
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    s += '<rect x="' + (90 + j * 15) + '" y="' + (22 + i * 15) + '" width="13" height="13" fill="#fff" opacity="' + (0.3 + ((i + j) % 3) * 0.18).toFixed(2) + '" rx="1"/>';
                }
            }
            // Mid grid (4x4) — x: 178 to 240
            for (var i2 = 0; i2 < 4; i2++) {
                for (var j2 = 0; j2 < 4; j2++) {
                    s += '<rect x="' + (178 + j2 * 16) + '" y="' + (28 + i2 * 16) + '" width="14" height="14" fill="#fff" opacity="' + (0.42 + ((i2 + j2) % 3) * 0.15).toFixed(2) + '" rx="1.5"/>';
                }
            }
            // Small grid (3x3) — x: 255 to 310
            for (var i3 = 0; i3 < 3; i3++) {
                for (var j3 = 0; j3 < 3; j3++) {
                    s += '<rect x="' + (255 + j3 * 19) + '" y="' + (33 + i3 * 19) + '" width="17" height="17" fill="#fff" opacity="' + (0.55 + ((i3 + j3) % 3) * 0.15).toFixed(2) + '" rx="2"/>';
                }
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        reservoir: function (uid) {
            // Canonical ESN reservoir: dense cloud of fixed random units with sparse recurrent edges
            var s = '';
            // Soft boundary suggesting the reservoir region
            s += '<ellipse cx="200" cy="60" rx="108" ry="42" fill="#fff" opacity="0.09"/>';
            s += '<ellipse cx="200" cy="60" rx="108" ry="42" fill="none" stroke="#fff" stroke-width="1.3" opacity="0.45" stroke-dasharray="4,3"/>';
            // 20 deterministic nodes distributed inside the ellipse (Vogel-like spiral so they look random but cover well)
            var nodes = [];
            var phi = Math.PI * (3 - Math.sqrt(5));
            for (var k = 0; k < 22; k++) {
                var ang = k * phi;
                var radNorm = Math.sqrt(k / 22);
                var x = 200 + radNorm * 95 * Math.cos(ang);
                var y = 60 + radNorm * 36 * Math.sin(ang);
                nodes.push({ x: x, y: y });
            }
            // Sparse random recurrent edges (predefined pairs)
            var edges = [
                [0, 5], [0, 11], [1, 4], [1, 14], [2, 9], [2, 18],
                [3, 7], [3, 17], [4, 13], [5, 16], [6, 10], [6, 19],
                [7, 15], [8, 12], [8, 21], [9, 20], [11, 17], [12, 18],
                [13, 19], [14, 21], [15, 20], [16, 11], [10, 4]
            ];
            s += '<g stroke="#fff" stroke-width="0.7" opacity="0.32" fill="none">';
            for (var e = 0; e < edges.length; e++) {
                var a = nodes[edges[e][0]];
                var b = nodes[edges[e][1]];
                if (!a || !b) continue;
                s += '<line x1="' + a.x.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + b.x.toFixed(1) + '" y2="' + b.y.toFixed(1) + '"/>';
            }
            s += '</g>';
            // Nodes themselves
            for (var n = 0; n < nodes.length; n++) {
                s += '<circle cx="' + nodes[n].x.toFixed(1) + '" cy="' + nodes[n].y.toFixed(1) + '" r="2.6" fill="#fff" opacity="0.85"/>';
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        manifold: function (uid) {
            // Big sunflower spiral cloud — a "swirled" high-dim point distribution
            var s = '';
            for (var k = 0; k < 60; k++) {
                var ang = k * 0.55;
                var r = 10 + (k % 8) * 8;
                var x = 200 + r * Math.cos(ang) * 2.3;
                var y = 60 + r * Math.sin(ang) * 0.85;
                if (x < 30 || x > 370 || y < 12 || y > 108) continue;
                var dotR = 2.2 + (k % 3) * 0.6;
                var op = 0.5 + (k % 4) * 0.13;
                s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + dotR.toFixed(1) + '" fill="#fff" opacity="' + op.toFixed(2) + '"/>';
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        projection: function (uid) {
            // High-dim points projected down to a 2D plane with dashed projection lines
            var s = '<line x1="20" y1="95" x2="380" y2="95" stroke="#fff" stroke-width="2" opacity="0.85"/>';
            var pts = [
                { x: 60, y: 28 }, { x: 100, y: 50 }, { x: 145, y: 30 },
                { x: 190, y: 45 }, { x: 240, y: 25 }, { x: 290, y: 55 }, { x: 340, y: 35 }
            ];
            for (var i = 0; i < pts.length; i++) {
                var p = pts[i];
                s += '<circle cx="' + p.x + '" cy="' + p.y + '" r="3.5" fill="#fff" opacity="0.85"/>';
                s += '<line x1="' + p.x + '" y1="' + (p.y + 4) + '" x2="' + p.x + '" y2="93" stroke="#fff" stroke-width="0.8" opacity="0.45" stroke-dasharray="2,2"/>';
                s += '<circle cx="' + p.x + '" cy="95" r="3.5" fill="#fff"/>';
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        svd: function (uid) {
            // Three abstract rectangles (tall · square · wide) — SVD shape proportions
            var s = '';
            s += '<rect x="70" y="22" width="34" height="76" fill="#fff" opacity="0.5" rx="3"/>';
            s += '<rect x="125" y="38" width="44" height="44" fill="#fff" opacity="0.72" rx="3"/>';
            s += '<rect x="190" y="48" width="140" height="24" fill="#fff" opacity="0.5" rx="3"/>';
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        memory: function (uid) {
            // Associative memory — 3 stored patterns, middle slot highlighted as retrieved
            var slots = [
                [[1, 0, 1], [0, 1, 0], [1, 0, 1]],
                [[0, 1, 0], [1, 1, 1], [0, 1, 0]],
                [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
            ];
            var s = '';
            var startX = [85, 175, 265];
            for (var m = 0; m < slots.length; m++) {
                var ox = startX[m];
                var oy = 28;
                var hl = m === 1;
                s += '<rect x="' + ox + '" y="' + oy + '" width="62" height="62" fill="' + (hl ? '#fff' : 'none') + '" opacity="' + (hl ? 0.25 : 1) + '" stroke="#fff" stroke-width="' + (hl ? 2.2 : 1.2) + '" rx="3"/>';
                var pat = slots[m];
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        if (pat[i][j]) {
                            var op = hl ? 1 : 0.78;
                            s += '<rect x="' + (ox + 9 + j * 16) + '" y="' + (oy + 9 + i * 16) + '" width="14" height="14" fill="#fff" opacity="' + op + '" rx="1"/>';
                        }
                    }
                }
            }
            // Retrieval indicator arrow under highlighted (middle) slot — at x=206
            s += '<polygon points="206,103 198,98 214,98" fill="#fff" opacity="0.7"/>';
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        prediction: function (uid) {
            // Time series — past (solid) + forecast (dashed) with uncertainty cone.
            // Now-divider, last past dot, and forecast start all aligned at x = 210.
            var s = '';
            var past = [
                { x: 35, y: 80 }, { x: 65, y: 70 }, { x: 95, y: 75 },
                { x: 125, y: 60 }, { x: 155, y: 65 }, { x: 185, y: 52 }, { x: 210, y: 58 }
            ];
            var d = 'M ' + past[0].x + ' ' + past[0].y;
            for (var i = 1; i < past.length; i++) d += ' L ' + past[i].x + ' ' + past[i].y;
            s += '<path d="' + d + '" fill="none" stroke="#fff" stroke-width="2.2" opacity="0.95"/>';
            for (var k = 0; k < past.length; k++) {
                s += '<circle cx="' + past[k].x + '" cy="' + past[k].y + '" r="3" fill="#fff"/>';
            }
            // "Now" divider — aligned exactly at last past dot
            s += '<line x1="210" y1="18" x2="210" y2="105" stroke="#fff" stroke-width="0.9" opacity="0.55" stroke-dasharray="3,3"/>';
            // Uncertainty cone fanning from (210, 58)
            s += '<path d="M 210 58 L 375 18 L 375 42 L 210 58 Z" fill="#fff" opacity="0.13"/>';
            s += '<path d="M 210 58 L 375 42 L 375 78 L 210 58 Z" fill="#fff" opacity="0.13"/>';
            // Forecast median — starts at the same (210, 58)
            s += '<path d="M 210 58 L 245 42 L 280 48 L 315 30 L 348 35 L 375 22" fill="none" stroke="#fff" stroke-width="2" opacity="0.75" stroke-dasharray="5,3"/>';
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        rank: function (uid) {
            // Three oriented nested ellipses — local principal directions, no explicit axes
            var s = '';
            var locations = [
                { cx: 100, cy: 52, ang: 0.35 },
                { cx: 200, cy: 65, ang: 1.05 },
                { cx: 300, cy: 48, ang: -0.55 }
            ];
            for (var l = 0; l < locations.length; l++) {
                var loc = locations[l];
                var rotDeg = (loc.ang * 180 / Math.PI).toFixed(1);
                s += '<ellipse cx="' + loc.cx + '" cy="' + loc.cy + '" rx="30" ry="11" fill="#fff" opacity="0.16" transform="rotate(' + rotDeg + ' ' + loc.cx + ' ' + loc.cy + ')"/>';
                s += '<ellipse cx="' + loc.cx + '" cy="' + loc.cy + '" rx="30" ry="11" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.78" transform="rotate(' + rotDeg + ' ' + loc.cx + ' ' + loc.cy + ')"/>';
                s += '<ellipse cx="' + loc.cx + '" cy="' + loc.cy + '" rx="16" ry="5.5" fill="none" stroke="#fff" stroke-width="1" opacity="0.55" transform="rotate(' + rotDeg + ' ' + loc.cx + ' ' + loc.cy + ')"/>';
                s += '<circle cx="' + loc.cx + '" cy="' + loc.cy + '" r="3" fill="#fff"/>';
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        dimensionality: function (uid) {
            // High-dim concentration of measure — spiky "porcupine" surface
            var s = '';
            var cx = 200, cy = 60;
            var coreRx = 24, coreRy = 16;
            // Soft inner core (where probability concentrates in high dim — empty-ish in the middle)
            s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + coreRx + '" ry="' + coreRy + '" fill="#fff" opacity="0.18"/>';
            s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + coreRx + '" ry="' + coreRy + '" fill="none" stroke="#fff" stroke-width="1.4" opacity="0.65"/>';
            // Many radiating spikes — the "spiky" L^p / high-dim surface
            var nSpikes = 20;
            for (var i = 0; i < nSpikes; i++) {
                var ang = (i / nSpikes) * Math.PI * 2;
                // Spike lengths alternate longer/shorter for visual interest
                var spikeLen = 26 + ((i % 3) * 8);
                var ax = 1.55, ay = 0.95;
                var x1 = cx + coreRx * Math.cos(ang) * 1.0;
                var y1 = cy + coreRy * Math.sin(ang) * 1.0;
                var x2 = cx + (coreRx + spikeLen) * Math.cos(ang) * ax;
                var y2 = cy + (coreRy + spikeLen) * Math.sin(ang) * ay;
                // Clamp inside canvas
                if (x2 < 12) x2 = 12; if (x2 > 388) x2 = 388;
                if (y2 < 8) y2 = 8; if (y2 > 112) y2 = 112;
                var op = 0.5 + (i % 3) * 0.16;
                s += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#fff" stroke-width="1.5" opacity="' + op.toFixed(2) + '"/>';
                s += '<circle cx="' + x2.toFixed(1) + '" cy="' + y2.toFixed(1) + '" r="2" fill="#fff" opacity="' + op.toFixed(2) + '"/>';
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        kkt: function (uid) {
            // KKT — feasible polygon with tangent objective contours; gradient at the optimum
            var s = '';
            // Feasible region (triangle)
            s += '<polygon points="50,40 340,28 280,95" fill="#fff" opacity="0.13" stroke="#fff" stroke-width="1.6" stroke-opacity="0.85"/>';
            // Objective contours (concentric ellipses), tangent to the bottom edge
            s += '<g fill="none" stroke="#fff" stroke-width="1.2" opacity="0.55">';
            s += '<ellipse cx="155" cy="55" rx="78" ry="32"/>';
            s += '<ellipse cx="155" cy="55" rx="58" ry="24"/>';
            s += '<ellipse cx="155" cy="55" rx="38" ry="16"/>';
            s += '</g>';
            s += '<circle cx="155" cy="55" r="2.5" fill="#fff" opacity="0.5"/>';
            // The optimum lies on the binding edge (tangent point)
            s += '<circle cx="232" cy="70" r="5" fill="#fff"/>';
            // Outward-normal gradient at the optimum
            s += '<line x1="232" y1="70" x2="272" y2="92" stroke="#fff" stroke-width="2" opacity="0.9"/>';
            s += '<polygon points="272,92 263,90 266,98" fill="#fff" opacity="0.9"/>';
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        noise: function (uid) {
            // Field of short vertical sample-lines at random positions and amplitudes — analog noise
            var s = '<g stroke="#fff" stroke-width="1">';
            for (var i = 0; i < 64; i++) {
                var x = 30 + (i * 340) / 63;
                var center = Math.sin(i * 2.7) * Math.cos(i * 1.3 + 0.5) * 0.7;
                var ampVar = Math.abs(Math.sin(i * 3.5) * Math.sin(i * 1.7));
                var y = 60 + center * 32;
                var h = 4 + ampVar * 16;
                var op = 0.4 + ((i % 3) * 0.2);
                s += '<line x1="' + x.toFixed(1) + '" y1="' + (y - h / 2).toFixed(1) + '" x2="' + x.toFixed(1) + '" y2="' + (y + h / 2).toFixed(1) + '" opacity="' + op.toFixed(2) + '"/>';
            }
            s += '</g>';
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        diffusion: function (uid) {
            // Brownian random-walk path + spreading uncertainty cone — pure abstract diffusion
            var s = '';
            // Uncertainty cone fanning out from origin (showing diffusion variance growth)
            s += '<path d="M 50 60 L 370 25 L 370 95 Z" fill="#fff" opacity="0.1"/>';
            // The Brownian walk itself
            var x = 50, y = 60;
            var path = 'M ' + x + ' ' + y;
            for (var t = 1; t < 65; t++) {
                x += 5;
                y += 9 * Math.sin(t * 1.7) + 5 * Math.cos(t * 2.3) + 2 * Math.sin(t * 5.1);
                if (y < 28) y = 28;
                if (y > 92) y = 92;
                path += ' L ' + x.toFixed(1) + ' ' + y.toFixed(1);
            }
            s += '<path d="' + path + '" fill="none" stroke="#fff" stroke-width="2" opacity="0.92"/>';
            // Origin dot
            s += '<circle cx="50" cy="60" r="4" fill="#fff"/>';
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        information: function (uid) {
            // Pseudo-random binary cell grid — encoded data, no source/channel diagram
            var s = '';
            var rows = 5, cols = 18;
            var cellW = 17, cellH = 17;
            var startX = (400 - cols * cellW) / 2;
            var startY = (120 - rows * cellH) / 2;
            for (var r = 0; r < rows; r++) {
                for (var c = 0; c < cols; c++) {
                    var bit = (Math.sin(r * 2.3 + c * 1.7) * Math.cos(c * 0.9 + r * 1.3)) > 0;
                    if (bit) {
                        var op = 0.45 + ((r + c) % 4) * 0.13;
                        s += '<rect x="' + (startX + c * cellW) + '" y="' + (startY + r * cellH) + '" width="' + (cellW - 3) + '" height="' + (cellH - 3) + '" fill="#fff" opacity="' + op.toFixed(2) + '" rx="1.5"/>';
                    }
                }
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        orthogonal: function (uid) {
            // Two perpendicular vectors from origin + right-angle marker. No grid.
            var s = '';
            var ox = 180, oy = 60;
            var v1Angle = -0.45;
            var v1Len = 48;     // smaller than before
            var v1x = ox + v1Len * Math.cos(v1Angle);
            var v1y = oy + v1Len * Math.sin(v1Angle);
            var v2Angle = v1Angle + Math.PI / 2;
            var v2Len = 42;
            var v2x = ox + v2Len * Math.cos(v2Angle);
            var v2y = oy + v2Len * Math.sin(v2Angle);
            function arrow(x1, y1, x2, y2, ang) {
                var dx1 = x2 - 9 * Math.cos(ang - 0.32);
                var dy1 = y2 - 9 * Math.sin(ang - 0.32);
                var dx2 = x2 - 9 * Math.cos(ang + 0.32);
                var dy2 = y2 - 9 * Math.sin(ang + 0.32);
                return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#fff" stroke-width="2.2" opacity="0.95"/>' +
                    '<polygon points="' + x2.toFixed(1) + ',' + y2.toFixed(1) + ' ' + dx1.toFixed(1) + ',' + dy1.toFixed(1) + ' ' + dx2.toFixed(1) + ',' + dy2.toFixed(1) + '" fill="#fff"/>';
            }
            s += arrow(ox, oy, v1x, v1y, v1Angle);
            s += arrow(ox, oy, v2x, v2y, v2Angle);
            // Right-angle marker at origin (small square in the corner between v1 and v2)
            var ra = 9;
            var rax1 = ox + ra * Math.cos(v1Angle);
            var ray1 = oy + ra * Math.sin(v1Angle);
            var rax2 = ox + ra * Math.cos(v2Angle);
            var ray2 = oy + ra * Math.sin(v2Angle);
            var raCornerX = rax1 + (rax2 - ox);
            var raCornerY = ray1 + (ray2 - oy);
            s += '<path d="M ' + rax1.toFixed(1) + ' ' + ray1.toFixed(1) + ' L ' + raCornerX.toFixed(1) + ' ' + raCornerY.toFixed(1) + ' L ' + rax2.toFixed(1) + ' ' + ray2.toFixed(1) + '" fill="none" stroke="#fff" stroke-width="1.4" opacity="0.85"/>';
            // Origin dot
            s += '<circle cx="' + ox + '" cy="' + oy + '" r="3" fill="#fff"/>';
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        },
        generative: function (uid) {
            // Noise source → branching paths → 3 varied samples. Tightened layout: shorter paths.
            var s = '';
            // Noise source moved rightward; outputs moved leftward → tighter overall composition
            s += '<circle cx="110" cy="60" r="18" fill="#fff" opacity="0.2"/>';
            s += '<circle cx="110" cy="60" r="18" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.85"/>';
            var noiseDots = [
                { x: 104, y: 53 }, { x: 115, y: 55 }, { x: 108, y: 67 },
                { x: 117, y: 64 }, { x: 101, y: 62 }, { x: 114, y: 50 }
            ];
            for (var n = 0; n < noiseDots.length; n++) {
                s += '<circle cx="' + noiseDots[n].x + '" cy="' + noiseDots[n].y + '" r="1.5" fill="#fff" opacity="0.7"/>';
            }
            // Outputs pulled leftward so branching arcs are visibly shorter
            var outputs = [
                { x: 270, y: 30 },
                { x: 285, y: 60 },
                { x: 270, y: 90 }
            ];
            s += '<g fill="none" stroke="#fff" stroke-width="1.2" opacity="0.6">';
            for (var i = 0; i < outputs.length; i++) {
                var o = outputs[i];
                s += '<path d="M 130 60 Q 195 ' + ((60 + o.y) / 2).toFixed(1) + ', ' + (o.x - 22) + ' ' + o.y + '"/>';
            }
            s += '</g>';
            for (var j = 0; j < outputs.length; j++) {
                var out = outputs[j];
                s += '<rect x="' + (out.x - 22) + '" y="' + (out.y - 15) + '" width="44" height="30" fill="#fff" opacity="0.15" rx="3"/>';
                s += '<rect x="' + (out.x - 22) + '" y="' + (out.y - 15) + '" width="44" height="30" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.85" rx="3"/>';
                if (j === 0) {
                    s += '<circle cx="' + out.x + '" cy="' + out.y + '" r="7" fill="#fff" opacity="0.75"/>';
                } else if (j === 1) {
                    s += '<rect x="' + (out.x - 8) + '" y="' + (out.y - 6) + '" width="16" height="12" fill="#fff" opacity="0.75" rx="1"/>';
                } else {
                    s += '<polygon points="' + out.x + ',' + (out.y - 8) + ' ' + (out.x + 8) + ',' + (out.y + 6) + ' ' + (out.x - 8) + ',' + (out.y + 6) + '" fill="#fff" opacity="0.75"/>';
                }
            }
            return '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + bg(uid) + s + '</svg>';
        }
    };

    var thumbCounter = 0;
    function injectThumbs() {
        var thumbs = document.querySelectorAll('.item-card-thumb[data-template]');
        thumbs.forEach(function (el) {
            if (el.dataset.injected === '1') return;
            var name = el.dataset.template;
            var fn = TEMPLATES[name] || TEMPLATES.nodes;
            el.innerHTML = fn('-' + (thumbCounter++));
            el.dataset.injected = '1';
        });
    }

    /* ---- Filter row ---- */
    function setupFilterRow(row) {
        var buttons = row.querySelectorAll('button[data-type]');
        if (buttons.length === 0) return;
        // The grid is the next sibling .item-grid in the same parent
        var grid = row.parentElement.querySelector('.item-grid');
        if (!grid) return;
        var cards = grid.querySelectorAll('[data-type]');
        var allBtn = row.querySelector('button[data-type="all"]');

        function apply() {
            var activeTypes = [];
            buttons.forEach(function (b) {
                if (b.dataset.type !== 'all' && b.classList.contains('active')) {
                    activeTypes.push(b.dataset.type);
                }
            });
            var showAll = (allBtn && allBtn.classList.contains('active')) || activeTypes.length === 0;
            cards.forEach(function (card) {
                var t = card.dataset.type;
                card.style.display = (showAll || activeTypes.indexOf(t) !== -1) ? '' : 'none';
            });
        }

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var type = btn.dataset.type;
                if (type === 'all') {
                    buttons.forEach(function (b) { b.classList.remove('active'); });
                    btn.classList.add('active');
                } else {
                    btn.classList.toggle('active');
                    var anySpecific = false;
                    buttons.forEach(function (b) {
                        if (b.dataset.type !== 'all' && b.classList.contains('active')) anySpecific = true;
                    });
                    if (allBtn) {
                        if (anySpecific) allBtn.classList.remove('active');
                        else allBtn.classList.add('active');
                    }
                }
                apply();
            });
        });
    }

    function initFilters() {
        document.querySelectorAll('.filter-row').forEach(setupFilterRow);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            injectThumbs();
            initFilters();
        });
    } else {
        injectThumbs();
        initFilters();
    }
})();
