// JavaScript
// Function to generate widget code
function generateWidget() {
  // Get input values
  var position = document.getElementById('position').value;
  var reaction1 = document.getElementById('reaction1').value;
  var reaction2 = document.getElementById('reaction2').value;
  var reaction3 = document.getElementById('reaction3').value;
  var reaction4 = document.getElementById('reaction4').value;
  
  // Extract emoji from reaction text
  var emoji1 = reaction1.split(' ')[0];
  
  // Position CSS
  var positionCSS = '';
  switch(position) {
    case 'bottom-left':
      positionCSS = 'bottom: 20px; left: 20px;';
      break;
    case 'top-right':
      positionCSS = 'top: 20px; right: 20px;';
      break;
    case 'top-left':
      positionCSS = 'top: 20px; left: 20px;';
      break;
    default: // bottom-right
      positionCSS = 'bottom: 20px; right: 20px;';
  }
  
  // Complete widget code with popups
  var code = `<!-- Reaction Widget -->
<style>
.widget-container {
  position: fixed;
  ${positionCSS}
  background: white;
  border-radius: 30px;
  padding: 10px;
  display: flex;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  z-index: 999;
}

.widget-btn {
  font-size: 24px;
  cursor: pointer;
  margin: 0 5px;
  user-select: none;
}

.widget-popup {
  position: fixed;
  ${positionCSS.replace(/20px/, '80px')}
  width: 250px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  display: none;
  z-index: 999;
}

.reaction-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px;
  margin: 5px 0;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.close-btn {
  display: inline-block;
  margin-top: 10px;
  color: blue;
  cursor: pointer;
}
</style>

<div class="widget-container">
  <div class="widget-btn" onclick="togglePopup('reaction-popup')">${emoji1}</div>
  <div class="widget-btn" onclick="togglePopup('info-popup')">ℹ️</div>
</div>

<div id="reaction-popup" class="widget-popup">
  <h4>Share your reaction</h4>
  <button class="reaction-btn" onclick="recordReaction(1)">${reaction1.replace(/"/g, '&quot;')}</button>
  <button class="reaction-btn" onclick="recordReaction(2)">${reaction2.replace(/"/g, '&quot;')}</button>
  <button class="reaction-btn" onclick="recordReaction(3)">${reaction3.replace(/"/g, '&quot;')}</button>
  <button class="reaction-btn" onclick="recordReaction(4)">${reaction4.replace(/"/g, '&quot;')}</button>
  <div class="close-btn" onclick="closePopups()">Close</div>
</div>

<div id="info-popup" class="widget-popup">
  <h4>Reaction Stats</h4>
  <div id="stats-content">
    <p>No reactions yet</p>
  </div>
  <div class="close-btn" onclick="closePopups()">Close</div>
</div>

<script>
// Store reaction data
var reactionCounts = [0, 0, 0, 0];
var hasReacted = false;
var reactionLabels = [
  "${reaction1}",
  "${reaction2}",
  "${reaction3}",
  "${reaction4}"
];

// Try to load saved reactions
try {
  var savedCounts = localStorage.getItem('reactionCounts');
  if (savedCounts) {
    reactionCounts = JSON.parse(savedCounts);
  }
  hasReacted = localStorage.getItem('hasReacted') === 'true';
} catch(e) {
  console.log('Error loading saved reactions');
}

// Toggle popup visibility
function togglePopup(popupId) {
  closePopups();
  document.getElementById(popupId).style.display = 'block';
  
  if (popupId === 'info-popup') {
    updateStats();
  }
}

// Close all popups
function closePopups() {
  var popups = document.getElementsByClassName('widget-popup');
  for (var i = 0; i < popups.length; i++) {
    popups[i].style.display = 'none';
  }
}

// Record a reaction
function recordReaction(index) {
  if (hasReacted) {
    alert('You have already reacted. Thank you!');
    return;
  }
  
  // Update counts (array is 0-based, but parameters are 1-based)
  reactionCounts[index-1]++;
  hasReacted = true;
  
  // Save reactions
  try {
    localStorage.setItem('reactionCounts', JSON.stringify(reactionCounts));
    localStorage.setItem('hasReacted', 'true');
  } catch(e) {
    console.log('Error saving reaction');
  }
  
  // Close popup and show stats
  closePopups();
  togglePopup('info-popup');
}

// Update stats display
function updateStats() {
  var total = reactionCounts.reduce(function(a, b) { return a + b; }, 0);
  var statsHtml = '';
  
  if (total === 0) {
    statsHtml = '<p>No reactions yet</p>';
  } else {
    statsHtml = '<p><strong>Total reactions:</strong> ' + total + '</p>';
    
    // Hard-code the labels to ensure they display correctly
    var displayLabels = [
      "${reaction1}",
      "${reaction2}",
      "${reaction3}",
      "${reaction4}"
    ];
    
    for (var i = 0; i < reactionCounts.length; i++) {
      var percent = Math.round((reactionCounts[i] / total) * 100) || 0;
      statsHtml += '<p>' + displayLabels[i] + ': ' + reactionCounts[i] + ' (' + percent + '%)</p>';
    }
  }
  
  document.getElementById('stats-content').innerHTML = statsHtml;
}
</script>`;

  // Update output
  document.getElementById('output').textContent = code;
}

// Function to copy code
function copyToClipboard() {
  var output = document.getElementById('output');
  var range = document.createRange();
  range.selectNode(output);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  
  try {
    document.execCommand('copy');
    alert('Code copied!');
  } catch (err) {
    alert('Failed to copy. Please select it manually.');
  }
  
  window.getSelection().removeAllRanges();
}

// Add event listeners
document.getElementById('generateBtn').addEventListener('click', generateWidget);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard);

// Generate code immediately on page load
generateWidget();
