// Function to generate widget code
function generateWidget() {
    // Get form values
    const position = document.getElementById('position').value;
    const reaction1 = document.getElementById('reaction1').value;
    const reaction2 = document.getElementById('reaction2').value;
    const reaction3 = document.getElementById('reaction3').value;
    const reaction4 = document.getElementById('reaction4').value;
    
    // Extract first emoji
    const emoji1 = reaction1.split(' ')[0];
    
    // Position CSS
    let positionCSS = '';
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
    
    // Build widget code
    const code = `<!-- Reaction Widget -->
<style>
.reaction-widget {
  position: fixed;
  ${positionCSS}
  background: white;
  border-radius: 30px;
  padding: 12px;
  display: flex;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 9999;
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
  width: 280px;
  background: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  display: none;
  z-index: 9999;
}

.popup-title {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}

.reaction-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  margin: 8px 0;
  background: #f5f7fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.reaction-btn:hover {
  background: #e9ecef;
}

.close-btn {
  display: inline-block;
  margin-top: 12px;
  color: #4361ee;
  cursor: pointer;
}
</style>

<div class="reaction-widget">
  <div class="widget-btn" onclick="togglePopup('reaction-popup')">${emoji1}</div>
  <div class="widget-btn" onclick="togglePopup('stats-popup')">ℹ️</div>
</div>

<div id="reaction-popup" class="widget-popup">
  <h4 class="popup-title">Share your reaction</h4>
  <button class="reaction-btn" onclick="recordReaction(0)">${reaction1.replace(/"/g, '&quot;')}</button>
  <button class="reaction-btn" onclick="recordReaction(1)">${reaction2.replace(/"/g, '&quot;')}</button>
  <button class="reaction-btn" onclick="recordReaction(2)">${reaction3.replace(/"/g, '&quot;')}</button>
  <button class="reaction-btn" onclick="recordReaction(3)">${reaction4.replace(/"/g, '&quot;')}</button>
  <div class="close-btn" onclick="closePopups()">Close</div>
</div>

<div id="stats-popup" class="widget-popup">
  <h4 class="popup-title">Reaction Stats</h4>
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
    "${reaction1.replace(/"/g, '&quot;')}",
    "${reaction2.replace(/"/g, '&quot;')}",
    "${reaction3.replace(/"/g, '&quot;')}",
    "${reaction4.replace(/"/g, '&quot;')}"
  ];
  
  // Check if user has already reacted
  try {
    var savedCounts = localStorage.getItem('reactionCounts');
    if (savedCounts) {
      reactionCounts = JSON.parse(savedCounts);
    }
    hasReacted = localStorage.getItem('hasReacted') === 'true';
  } catch(e) {
    console.log('Error loading saved data');
  }
  
  // Show/hide popups
  function togglePopup(popupId) {
    closePopups();
    document.getElementById(popupId).style.display = 'block';
    
    if (popupId === 'stats-popup') {
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
  
  // Record reaction
  function recordReaction(index) {
    if (hasReacted) {
      alert('You have already reacted. Thank you!');
      return;
    }
    
    reactionCounts[index]++;
    hasReacted = true;
    
    // Save to storage
    try {
      localStorage.setItem('reactionCounts', JSON.stringify(reactionCounts));
      localStorage.setItem('hasReacted', 'true');
    } catch(e) {
      console.log('Error saving reaction');
    }
    
    // Close popup and show stats
    closePopups();
    togglePopup('stats-popup');
  }
  
  // Update stats display
  function updateStats() {
    var total = reactionCounts.reduce(function(a, b) { return a + b; }, 0);
    var statsHtml = '';
    
    if (total === 0) {
      statsHtml = '<p>No reactions yet</p>';
    } else {
      statsHtml = '<p><strong>Total reactions:</strong> ' + total + '</p>';
      
      for (var i = 0; i < reactionCounts.length; i++) {
        var percent = Math.round((reactionCounts[i] / total) * 100) || 0;
        statsHtml += '<p>' + reactionLabels[i] + ': ' + reactionCounts[i] + ' (' + percent + '%)</p>';
      }
    }
    
    document.getElementById('stats-content').innerHTML = statsHtml;
  }
</script>`;
    
    // Update output
    document.getElementById('output').innerHTML = code;
}

// Function to copy code
function copyCode() {
    const outputDiv = document.getElementById('output');
    const range = document.createRange();
    range.selectNode(outputDiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    
    try {
        const successful = document.execCommand('copy');
        alert(successful ? 'Code copied to clipboard!' : 'Unable to copy code');
    } catch (err) {
        alert('Failed to copy: ' + err);
    }
    
    window.getSelection().removeAllRanges();
}
