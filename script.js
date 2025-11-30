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

// Workdays Calculation Functions
function isWeekend(date) {
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
}

// Cache for storing holiday data by year
let holidayCache = {};

// Function to check if a date is a public holiday by parsing ICS data
async function isPublicHoliday(date) {
    const dateStr = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const year = date.getFullYear();

    // Check if we have cached data for this year
    if (!holidayCache[year]) {
        try {
            // Fetch holiday data for the specified year from ICS
            const holidays = await fetchHolidaysFromICS(year);
            holidayCache[year] = holidays;
        } catch (error) {
            console.error('Error fetching holidays from ICS:', error);
            // Fallback to the local holiday calculation if ICS fails
            return isPublicHolidayLocal(date);
        }
    }

    // Check if the specific date is in the holiday list
    return holidayCache[year].includes(dateStr);
}

// Fallback function using local holiday calculation
function isPublicHolidayLocal(date) {
    const dateStr = date.toISOString().split('T')[0];

    // Fixed-date public holidays in Thailand
    const fixedHolidays = [
        '01-01', // วันขึ้นปีใหม่สากล
        '02-06', // วันคล้ายวันพระราชสมภพสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ
        '04-06', // วันจักรี
        '05-01', // วันแรงงานแห่งชาติ
        '05-05', // วันฉัตรมงคล
        '07-28', // วันคล้ายวันพระราชสมภพสมเด็จพระเจ้าอยู่หัว
        '08-12', // วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ
        '10-13', // วันคล้ายวันสวรรคตพระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช
        '10-23', // วันปิยมหาราช
        '12-05', // วันคล้ายวันพระราชสมภพพระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช
        '12-10'  // วันรัฐธรรมนูญ
    ];

    // Check fixed-date holidays
    const monthDay = dateStr.substring(5); // Extract MM-DD
    if (fixedHolidays.includes(monthDay)) {
        return true;
    }

    // Special calculations for holidays that depend on lunar calendar or specific rules
    const year = date.getFullYear();

    // Check for Songkran (April 13-15, but sometimes varies)
    if (monthDay === '04-13' || monthDay === '04-14' || monthDay === '04-15') {
        if (year >= 2017) { // From 2017, Songkran is celebrated for 3 days
            return true;
        } else { // Before 2017, only April 13-14
            if (monthDay === '04-13' || monthDay === '04-14') {
                return true;
            }
        }
    }

    // Check for movable holidays that may be announced by the government
    const movableHolidays = getMovableHolidays(year);
    if (movableHolidays.includes(dateStr)) {
        return true;
    }

    // Check for Buddhist Lent Day (starts on the first day of the 11th month in the Thai lunar calendar)
    // This is approximate and may vary by region
    const buddhistLentDays = getBuddhistLentDays(year);
    if (buddhistLentDays.includes(dateStr)) {
        return true;
    }

    // Check for other lunar calendar holidays
    const lunarHolidays = getLunarHolidays(year);
    if (lunarHolidays.includes(dateStr)) {
        return true;
    }

    return false;
}

// Fetch holidays for a specific year from ICS file
async function fetchHolidaysFromICS(year) {
    // Use the Office Holidays ICS feed for Thailand
    // This is a public ICS feed that contains Thai public holidays
    const icsUrl = 'https://www.officeholidays.com/ics/thailand';

    try {
        const response = await fetch(icsUrl);
        if (!response.ok) {
            throw new Error(`ICS request failed with status ${response.status}`);
        }

        const icsText = await response.text();
        const holidays = parseICSToHolidays(icsText, year);

        return holidays;
    } catch (error) {
        console.error(`Error fetching holidays from ICS for year ${year}:`, error);
        throw error;
    }
}

// Parse ICS text to extract holiday dates for a specific year
function parseICSToHolidays(icsText, targetYear) {
    // Split the ICS text into lines
    const lines = icsText.split(/\r?\n/);
    let currentEvent = null;
    const events = [];
    let inEvent = false;

    for (const line of lines) {
        // Look for the start of an event
        if (line.startsWith('BEGIN:VEVENT')) {
            inEvent = true;
            currentEvent = {};
        }
        // Look for the end of an event
        else if (line.startsWith('END:VEVENT')) {
            if (currentEvent && currentEvent.dtstart) {
                events.push(currentEvent);
            }
            inEvent = false;
            currentEvent = null;
        }
        // Parse event properties while inside an event
        else if (inEvent) {
            // Handle property names that might be split across lines
            if (line.startsWith(' ') && currentEvent && Object.keys(currentEvent).length > 0) {
                // Continuation line - append to the last property
                const lastKey = Object.keys(currentEvent)[Object.keys(currentEvent).length - 1];
                if (lastKey) {
                    currentEvent[lastKey] += line.substring(1); // Remove the leading space
                }
            }
            else {
                // Regular property line
                const colonIndex = line.indexOf(':');
                if (colonIndex > 0) {
                    const property = line.substring(0, colonIndex);
                    const value = line.substring(colonIndex + 1);

                    if (property === 'DTSTART' || property === 'DTSTART;VALUE=DATE') {
                        currentEvent.dtstart = value;
                    } else if (property === 'SUMMARY') {
                        currentEvent.summary = value;
                    }
                }
            }
        }
    }

    // Extract dates for the target year
    const holidayDates = [];

    for (const event of events) {
        if (event.dtstart) {
            // The date should be in YYYYMMDD format in ICS
            let dateStr = event.dtstart;

            // Handle different ICS date formats
            if (dateStr.includes('T')) {
                // If it's a datetime format like YYYYMMDDTHHMMSSZ
                dateStr = dateStr.substring(0, 8);
            }

            // Extract year from the date string
            if (dateStr.length >= 8) {
                const eventYear = parseInt(dateStr.substring(0, 4));

                // Only include holidays from the target year
                if (eventYear === targetYear) {
                    // Convert YYYYMMDD to YYYY-MM-DD
                    const year = dateStr.substring(0, 4);
                    const month = dateStr.substring(4, 6);
                    const day = dateStr.substring(6, 8);
                    holidayDates.push(`${year}-${month}-${day}`);
                }
            }
        }
    }

    return holidayDates;
}

// Helper function to get movable holidays that may change from year to year
function getMovableHolidays(year) {
    // Thai government may move some holidays for long weekends, etc.
    // These are based on official announcements which are usually made annually
    const movableHolidays = [];

    // Add any specific movable holidays for the given year
    // Example for specific years when certain holidays were moved (this would be updated annually)
    if (year === 2024) {
        // In 2024, there were several special holidays declared by the Thai government
        movableHolidays.push(
            '2024-04-11', // Additional Songkran holiday
            '2024-05-06', // Bridge day for Coronation Day
        );
    } else if (year === 2025) {
        // Placeholder for 2025 holidays when announced
        movableHolidays.push(
            // Add any extra holidays announced for 2025
        );
    }

    return movableHolidays;
}

// Overtime Calculation Function
function calculateOvertime() {
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value);
    const overtimeHours = parseFloat(document.getElementById('overtime-hours').value);
    const overtimeType = document.getElementById('overtime-type').value;

    if (isNaN(hourlyRate) || isNaN(overtimeHours)) {
        const resultDiv = document.getElementById('overtime-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนอัตราค่าจ้างต่อชั่วโมงและจำนวนชั่วโมงล่วงเวลา</p>';
        resultDiv.classList.add('show');
        return;
    }

    if (hourlyRate <= 0 || overtimeHours <= 0) {
        const resultDiv = document.getElementById('overtime-result');
        resultDiv.innerHTML = '<p class="warning">อัตราค่าจ้างต่อชั่วโมงและจำนวนชั่วโมงล่วงเวลาต้องเป็นตัวเลขบวก</p>';
        resultDiv.classList.add('show');
        return;
    }

    let multiplier = 1;
    let typeDescription = '';

    switch(overtimeType) {
        case 'weekday':
            multiplier = 1.5;
            typeDescription = 'วันธรรมดา (1.5 เท่า)';
            break;
        case 'weekend':
            multiplier = 2;
            typeDescription = 'วันหยุดเสาร์-อาทิตย์ (2 เท่า)';
            break;
        case 'holiday':
            multiplier = 3;
            typeDescription = 'วันหยุดนักขัตฤกษ์ (3 เท่า)';
            break;
    }

    // Calculate overtime pay
    const overtimePay = hourlyRate * multiplier * overtimeHours;

    const resultDiv = document.getElementById('overtime-result');
    resultDiv.innerHTML = `
        <p><strong>อัตราค่าจ้างต่อชั่วโมง:</strong> ${hourlyRate.toFixed(2)} บาท</p>
        <p><strong>จำนวนชั่วโมงล่วงเวลา:</strong> ${overtimeHours.toFixed(1)} ชั่วโมง</p>
        <p><strong>ประเภทการทำงานล่วงเวลา:</strong> ${typeDescription}</p>
        <p><strong>อัตราคูณ:</strong> ${multiplier} เท่า</p>
        <p><strong>ค่าล่วงเวลาทั้งหมด:</strong> <span class="highlight">${overtimePay.toFixed(2)} บาท</span></p>
        <p><em>คำนวณตามกฎหมายแรงงาน: วันธรรมดา 1.5 เท่า, วันหยุดสุดสัปดาห์ 2 เท่า, วันหยุดนักขัตฤกษ์ 3 เท่า</em></p>
    `;
    resultDiv.classList.add('show');
}

// Helper function to get approximate Buddhist Lent Days for a given year
function getBuddhistLentDays(year) {
    // This is an approximation - actual dates vary by lunar calendar
    // Buddhist Lent (Vassa) starts on the first day of waning moon in the 11th month of Thai lunar calendar
    // Usually falls in July or August - using approximate dates
    const approxDates = [];

    // For 2024-2027, the approximate dates would be:
    if (year === 2024) {
        approxDates.push('2024-07-17'); // Approximate date
    } else if (year === 2025) {
        approxDates.push('2025-07-06'); // Approximate date
    } else if (year === 2026) {
        approxDates.push('2026-07-25'); // Approximate date
    } else if (year === 2027) {
        approxDates.push('2027-07-15'); // Approximate date
    }

    return approxDates;
}

// Toggle visibility of calculator sections
function toggleSection(button) {
    // Find the parent section
    const section = button.closest('.calculator-section');

    // Find the container that holds all calculator divs within this section
    const calculators = section.querySelectorAll('.calculator');

    // Toggle visibility of each calculator in the section
    for (const calculator of calculators) {
        if (calculator.style.display === 'none' || calculator.style.display === '') {
            calculator.style.display = 'block';
        } else {
            calculator.style.display = 'none';
        }
    }

    // Update the button text to show eye-based icon based on what the button will do next
    // If calculators are now visible, show cross (to indicate it will hide when clicked)
    // If calculators are now hidden, show open eye (to indicate it will show when clicked)
    const areNowVisible = calculators[0].style.display !== 'none';
    button.innerHTML = areNowVisible ? '⊖' : '👁️'; // Circle with minus to hide, open eye to show
}

// Helper function to get lunar calendar holidays for a given year
function getLunarHolidays(year) {
    // Chinese New Year dates (according to lunar calendar, varies each year)
    const chineseNewYear = {
        2024: ['2024-02-10', '2024-02-11', '2024-02-12'],
        2025: ['2025-01-29', '2025-01-30', '2025-01-31'],
        2026: ['2026-02-17', '2026-02-18', '2026-02-19'],
        2027: ['2027-02-06', '2027-02-07', '2027-02-08']
    };

    // Loy Krathong (usually in November)
    const loyKrathong = {
        2024: ['2024-11-15'],
        2025: ['2025-11-04'],
        2026: ['2026-10-24'],
        2027: ['2027-11-13']
    };

    let holidays = [];
    if (chineseNewYear[year]) {
        holidays = holidays.concat(chineseNewYear[year]);
    }
    if (loyKrathong[year]) {
        holidays = holidays.concat(loyKrathong[year]);
    }

    return holidays;
}

async function calculateWorkdays() {
    const startDate = document.getElementById('workdays-start-date').value;
    const endDate = document.getElementById('workdays-end-date').value;

    if (!startDate || !endDate) {
        const resultDiv = document.getElementById('workdays-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนทั้งวันที่เริ่มต้นและวันที่สิ้นสุด</p>';
        resultDiv.classList.add('show');
        return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        const resultDiv = document.getElementById('workdays-result');
        resultDiv.innerHTML = '<p class="warning">กรุณาป้อนวันที่ที่ถูกต้อง</p>';
        resultDiv.classList.add('show');
        return;
    }

    // Ensure start date is before end date
    if (start > end) {
        // Swap dates to ensure correct order
        [start, end] = [end, start];
    }

    // Calculate workdays
    let workdays = 0;
    let currentDate = new Date(start);
    currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 to avoid time offset issues

    // First, ensure we have holiday data for all required years
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    // Fetch holiday data for all years in the range (with a reasonable limit to avoid too many API calls)
    for (let year = startYear; year <= endYear; year++) {
        if (!holidayCache[year]) {
            try {
                // Show loading message while fetching data
                const resultDiv = document.getElementById('workdays-result');
                resultDiv.innerHTML = '<p>กำลังดึงข้อมูลวันหยุดราชการ...</p>';
                resultDiv.classList.add('show');

                const holidays = await fetchHolidaysForYear(year);
                holidayCache[year] = holidays;
            } catch (error) {
                console.error(`Error fetching holidays for year ${year}:`, error);
                // Continue with local calculation if API fails
                const resultDiv = document.getElementById('workdays-result');
                resultDiv.innerHTML = '<p>ใช้ข้อมูลวันหยุดราชการภายในเครื่อง (เกิดปัญหาในการดึงข้อมูลจาก API)</p>';
                resultDiv.classList.add('show');
            }
        }
    }

    // Reset the date to start from the beginning again
    currentDate = new Date(start);
    currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 to avoid time offset issues

    while (currentDate <= end) {
        const isWeekendDay = isWeekend(currentDate);
        const isHoliday = await isPublicHoliday(currentDate); // This is now async

        if (!isWeekendDay && !isHoliday) {
            workdays++;
        }

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Format dates for display
    const startFormatted = start.toLocaleDateString('th-TH');
    const endFormatted = end.toLocaleDateString('th-TH');

    const resultDiv = document.getElementById('workdays-result');
    resultDiv.innerHTML = `
        <p><strong>วันที่เริ่มต้น:</strong> ${startFormatted}</p>
        <p><strong>วันที่สิ้นสุด:</strong> ${endFormatted}</p>
        <p><strong>จำนวนวันทำงาน:</strong> <span class="highlight">${workdays} วัน</span></p>
        <p><em>ไม่รวมวันเสาร์-อาทิตย์ และวันหยุดราชการ/เทศกาล</em></p>
    `;
    resultDiv.classList.add('show');
}