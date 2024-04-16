// Define GPS leap seconds
function getleaps() {
    const leaps = [46828800, 78364801, 109900802, 173059203, 252028804, 315187205, 346723206, 393984007, 425520008, 457056009, 504489610, 551750411, 599184012, 820108813, 914803214, 1025136015, 1119744016, 1167264017];
    return leaps;
  }
  
// Test to see if a GPS second is a leap second
function isleap(gpsTime) {
    let isLeap = false;
    const leaps = getleaps();
    const lenLeaps = leaps.length;
    for (let i = 0; i < lenLeaps; i++) {
      if (gpsTime === leaps[i]) {
        isLeap = true;
      }
    }
    return isLeap;
  }
  
// Count number of leap seconds that have passed
function countleaps(gpsTime, dirFlag) {
    const leaps = getleaps();
    const lenLeaps = leaps.length;
    let nleaps = 0;  // number of leap seconds prior to gpsTime
    for (let i = 0; i < lenLeaps; i++) {
      if (dirFlag === 'gps2unix') {
        if (gpsTime >= leaps[i]) {
          nleaps++;
        }
      } else {
        console.error("ERROR Invalid Flag!");
      }
    }
    return nleaps;
  }
    
// Convert GPS Time to Unix Time
function gps2unix(gpsTime) {
    // Add offset in seconds
    let unixTime = parseFloat(gpsTime) + 315964800.0;
    const nleaps = countleaps(parseInt(gpsTime), 'gps2unix');
    unixTime -= nleaps;
    if (isleap(parseInt(gpsTime))) {
      unixTime += 0.5;
    }
    return unixTime;
  }
