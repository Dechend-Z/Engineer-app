// Utility Calculator Application
// Handles date calculations, battery life estimation, text analysis, and number conversion

// Date Calculation Functions
function calculateDateDifference() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!startDate || !endDate) {
        const resultDiv = document.getElementById('date-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนทั้งวันที่เริ่มต้นและวันที่สิ้นสุด</p>';
        resultDiv.classList.add('show');
        return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        const resultDiv = document.getElementById('date-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนวันที่ที่ถูกต้อง</p>';
        resultDiv.classList.add('show');
        return;
    }

    // Calculate the time difference in milliseconds
    const diffTime = Math.abs(end - start);

    // Convert to different units
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44); // Average days per month
    const diffYears = Math.floor(diffDays / 365.25); // Account for leap years

    // Calculate remaining units
    const remainingDays = diffDays % 7;
    const remainingDaysAfterMonths = diffDays % 30.44;
    const remainingDaysAfterYears = diffDays % 365.25;

    // Determine the direction of time
    const isFuture = end > start;
    const direction = isFuture ? "ถึง" : "จาก";

    const resultDiv = document.getElementById('date-result');
    resultDiv.innerHTML = `
        <p><strong>วันที่เริ่มต้น:</strong> ${start.toLocaleDateString()}</p>
        <p><strong>วันที่สิ้นสุด:</strong> ${end.toLocaleDateString()}</p>
        <p><strong>ความแตกต่าง:</strong></p>
        <p>${diffDays} วัน ${direction}</p>
        <p>${diffWeeks} สัปดาห์ และ ${remainingDays} วัน</p>
        <p>${diffMonths} เดือน และ ${remainingDaysAfterMonths.toFixed(0)} วัน</p>
        <p>${diffYears} ปี และ ${remainingDaysAfterYears.toFixed(0)} วัน</p>
    `;
    resultDiv.classList.add('show');
}

function addDaysToDate() {
    const baseDate = document.getElementById('base-date').value;
    const daysToAdd = parseFloat(document.getElementById('days-to-add').value);

    if (!baseDate) {
        const resultDiv = document.getElementById('add-days-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนวันที่หลัก</p>';
        resultDiv.classList.add('show');
        return;
    }

    if (isNaN(daysToAdd)) {
        const resultDiv = document.getElementById('add-days-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนจำนวนวันที่ถูกต้องเพื่อเพิ่ม</p>';
        resultDiv.classList.add('show');
        return;
    }

    const base = new Date(baseDate);
    if (isNaN(base.getTime())) {
        const resultDiv = document.getElementById('add-days-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนวันที่หลักที่ถูกต้อง</p>';
        resultDiv.classList.add('show');
        return;
    }

    // Add days by multiplying milliseconds per day
    const newDate = new Date(base.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));

    const resultDiv = document.getElementById('add-days-result');
    resultDiv.innerHTML = `
        <p><strong>วันที่หลัก:</strong> ${base.toLocaleDateString()}</p>
        <p><strong>จำนวนวันที่เพิ่ม:</strong> ${daysToAdd}</p>
        <p><strong>วันที่ใหม่:</strong> <span class="highlight">${newDate.toLocaleDateString()}</span></p>
    `;
    resultDiv.classList.add('show');
}

// Battery Life Calculation Functions
function calculateBatteryLife() {
    const capacity = parseFloat(document.getElementById('battery-capacity').value);
    const consumption = parseFloat(document.getElementById('device-consumption').value);
    const efficiency = parseFloat(document.getElementById('efficiency-factor').value) || 90;

    if (isNaN(capacity) || isNaN(consumption)) {
        const resultDiv = document.getElementById('battery-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนความจุแบตเตอรี่และการใช้พลังงานอุปกรณ์</p>';
        resultDiv.classList.add('show');
        return;
    }

    if (capacity <= 0 || consumption <= 0) {
        const resultDiv = document.getElementById('battery-result');
        resultDiv.innerHTML = '<p class="warning">ความจุและการใช้พลังงานต้องเป็นตัวเลขบวก</p>';
        resultDiv.classList.add('show');
        return;
    }

    if (efficiency <= 0 || efficiency > 100) {
        const resultDiv = document.getElementById('battery-result');
        resultDiv.innerHTML = '<p class="warning">ปัจจัยประสิทธิภาพต้องอยู่ระหว่าง 0 ถึง 100</p>';
        resultDiv.classList.add('show');
        return;
    }

    // Calculate raw battery life in hours
    let lifeHours = capacity / consumption;

    // Apply efficiency factor
    lifeHours = lifeHours * (efficiency / 100);

    // Convert to other units
    const lifeMinutes = lifeHours * 60;
    const lifeDays = lifeHours / 24;
    const lifeWeeks = lifeDays / 7;
    const lifeMonths = lifeDays / 30.44; // Average days per month
    const lifeYears = lifeDays / 365.25; // Account for leap years

    const resultDiv = document.getElementById('battery-result');
    resultDiv.innerHTML = `
        <p><strong>ความจุแบตเตอรี่:</strong> ${capacity} mAh</p>
        <p><strong>การใช้พลังงานอุปกรณ์:</strong> ${consumption} mA</p>
        <p><strong>ปัจจัยประสิทธิภาพ:</strong> ${efficiency}%</p>
        <p><strong>อายุการใช้งานแบตเตอรี่โดยประมาณ:</strong></p>
        <p><span class="highlight">${lifeHours.toFixed(2)} ชั่วโมง</span></p>
        <p>${lifeMinutes.toFixed(1)} นาที</p>
        <p>${lifeDays.toFixed(2)} วัน</p>
        <p>${lifeWeeks.toFixed(2)} สัปดาห์</p>
        <p>${lifeMonths.toFixed(2)} เดือน</p>
        <p>${lifeYears.toFixed(2)} ปี</p>
        <p><em>หมายเหตุ: อายุการใช้งานแบตเตอรี่จริงอาจแตกต่างกันขึ้นอยู่กับรูปแบบการใช้งานและสภาวะแวดล้อม</em></p>
    `;
    resultDiv.classList.add('show');
}

function calculateDischargeTime() {
    const capacity = parseFloat(document.getElementById('battery-capacity-2').value);
    const usagePercent = parseFloat(document.getElementById('usage-percentage').value) || 100;
    const currentDraw = parseFloat(document.getElementById('current-draw').value);

    if (isNaN(capacity) || isNaN(currentDraw)) {
        const resultDiv = document.getElementById('discharge-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนความจุแบตเตอรี่และการใช้กระแส</p>';
        resultDiv.classList.add('show');
        return;
    }

    if (capacity <= 0 || currentDraw <= 0) {
        const resultDiv = document.getElementById('discharge-result');
        resultDiv.innerHTML = '<p class="warning">ความจุและการใช้กระแสต้องเป็นตัวเลขบวก</p>';
        resultDiv.classList.add('show');
        return;
    }

    if (usagePercent <= 0 || usagePercent > 100) {
        const resultDiv = document.getElementById('discharge-result');
        resultDiv.innerHTML = '<p class="warning">เปอร์เซ็นต์การใช้งานต้องอยู่ระหว่าง 0 ถึง 100</p>';
        resultDiv.classList.add('show');
        return;
    }

    // Calculate effective capacity based on usage percentage
    const effectiveCapacity = capacity * (usagePercent / 100);

    // Calculate discharge time in hours
    const dischargeHours = effectiveCapacity / currentDraw;

    // Convert to other units
    const dischargeMinutes = dischargeHours * 60;
    const dischargeDays = dischargeHours / 24;
    const dischargeWeeks = dischargeDays / 7;
    const dischargeMonths = dischargeDays / 30.44; // Average days per month
    const dischargeYears = dischargeDays / 365.25; // Account for leap years

    const resultDiv = document.getElementById('discharge-result');
    resultDiv.innerHTML = `
        <p><strong>ความจุแบตเตอรี่:</strong> ${capacity} mAh</p>
        <p><strong>เปอร์เซ็นต์การใช้งาน:</strong> ${usagePercent}%</p>
        <p><strong>ความจุที่มีประสิทธิภาพ:</strong> ${effectiveCapacity.toFixed(2)} mAh</p>
        <p><strong>การใช้กระแส:</strong> ${currentDraw} mA</p>
        <p><strong>เวลาคายประจุโดยประมาณ:</strong></p>
        <p><span class="highlight">${dischargeHours.toFixed(2)} ชั่วโมง</span></p>
        <p>${dischargeMinutes.toFixed(1)} นาที</p>
        <p>${dischargeDays.toFixed(2)} วัน</p>
        <p>${dischargeWeeks.toFixed(2)} สัปดาห์</p>
        <p>${dischargeMonths.toFixed(2)} เดือน</p>
        <p>${dischargeYears.toFixed(2)} ปี</p>
        <p><em>นี่คือเวลาที่ใช้จนกว่าแบตเตอรี่จะคายประจุถึงเปอร์เซ็นต์ที่ระบุ</em></p>
    `;
    resultDiv.classList.add('show');
}

// Text Analysis Functions
function analyzeText() {
    const text = document.getElementById('input-text').value;

    if (text.trim() === '') {
        const resultDiv = document.getElementById('text-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนข้อความเพื่อวิเคราะห์</p>';
        resultDiv.classList.add('show');
        return;
    }

    // Calculate various text statistics
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphCount = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const avgWordLength = wordCount > 0 ? (charCount / wordCount).toFixed(2) : 0;

    const resultDiv = document.getElementById('text-result');
    resultDiv.innerHTML = `
        <p><strong>จำนวนตัวอักษร:</strong> <span class="highlight">${charCount}</span></p>
        <p><strong>จำนวนตัวอักษร (ไม่รวมช่องว่าง):</strong> ${charCountNoSpaces}</p>
        <p><strong>จำนวนคำ:</strong> <span class="highlight">${wordCount}</span></p>
        <p><strong>จำนวนประโยค:</strong> ${sentenceCount}</p>
        <p><strong>จำนวนย่อหน้า:</strong> ${paragraphCount}</p>
        <p><strong>ความยาวคำเฉลี่ย:</strong> ${avgWordLength} ตัวอักษร</p>
    `;
    resultDiv.classList.add('show');
}

// Number System Converter Functions
function convertFromDecimal() {
    const decimalInput = document.getElementById('decimal-input').value;

    if (decimalInput === '') {
        updateConverterResults('', '', '');
        return;
    }

    const decimal = parseInt(decimalInput, 10);

    if (isNaN(decimal) || decimal < 0) {
        const resultDiv = document.getElementById('converter-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนเลขฐานสิบที่ถูกต้องและเป็นจำนวนบวก</p>';
        resultDiv.classList.add('show');
        return;
    }

    const binary = decimal.toString(2);
    const hex = decimal.toString(16).toUpperCase();

    updateConverterResults(decimal, binary, hex);
}

function convertFromBinary() {
    const binaryInput = document.getElementById('binary-input').value;

    if (binaryInput === '') {
        updateConverterResults('', '', '');
        return;
    }

    // Validate binary input (only 0s and 1s)
    const binaryRegex = /^[01]+$/;
    if (!binaryRegex.test(binaryInput)) {
        const resultDiv = document.getElementById('converter-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนเลขฐานสองที่ถูกต้อง (เฉพาะ 0 และ 1 เท่านั้น)</p>';
        resultDiv.classList.add('show');
        return;
    }

    const decimal = parseInt(binaryInput, 2);
    const hex = decimal.toString(16).toUpperCase();

    updateConverterResults(decimal, binaryInput, hex);
}

function convertFromHex() {
    const hexInput = document.getElementById('hex-input').value;

    if (hexInput === '') {
        updateConverterResults('', '', '');
        return;
    }

    // Validate hexadecimal input (0-9, A-F)
    const hexRegex = /^[0-9A-Fa-f]+$/;
    if (!hexRegex.test(hexInput)) {
        const resultDiv = document.getElementById('converter-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนเลขฐานสิบหกที่ถูกต้อง (0-9, A-F)</p>';
        resultDiv.classList.add('show');
        return;
    }

    const decimal = parseInt(hexInput, 16);
    const binary = decimal.toString(2);

    updateConverterResults(decimal, binary, hexInput.toUpperCase());
}

function updateConverterResults(decimal, binary, hex) {
    // Update the input fields without triggering events
    const decInput = document.getElementById('decimal-input');
    const binInput = document.getElementById('binary-input');
    const hexInput = document.getElementById('hex-input');

    decInput.value = decimal;
    binInput.value = binary;
    hexInput.value = hex;

    // Show results
    const resultDiv = document.getElementById('converter-result');
    if (decimal !== '' && binary !== '' && hex !== '') {
        resultDiv.innerHTML = `
            <p><strong>เลขฐานสิบ (Decimal):</strong> ${decimal}</p>
            <p><strong>เลขฐานสอง (Binary):</strong> ${binary}</p>
            <p><strong>เลขฐานสิบหก (Hexadecimal):</strong> ${hex}</p>
        `;
    } else {
        resultDiv.innerHTML = '<p>ป้อนค่าในช่องใดช่องหนึ่งและจะมีการแปลงเป็นรูปแบบอื่นโดยอัตโนมัติ</p>';
    }
    resultDiv.classList.add('show');
}

function clearConverter() {
    document.getElementById('decimal-input').value = '';
    document.getElementById('binary-input').value = '';
    document.getElementById('hex-input').value = '';

    const resultDiv = document.getElementById('converter-result');
    resultDiv.innerHTML = '<p>ป้อนค่าในช่องใดช่องหนึ่งและจะมีการแปลงเป็นรูปแบบอื่นโดยอัตโนมัติ</p>';
    resultDiv.classList.remove('show');
}