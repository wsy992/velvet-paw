/** Parse a YYYY-MM-DD string as LOCAL time (Date constructor treats it as UTC). */
function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  if (y && m && d) return new Date(y, m - 1, d);
  return new Date(dateStr);
}

export function calculateAge(birthday: string): { years: number; days: number } {
  const birth = parseLocalDate(birthday);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    years--;
  }

  const lastBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (today < lastBirthday) {
    lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);
  }
  const days = Math.floor((today.getTime() - lastBirthday.getTime()) / (1000 * 60 * 60 * 24));

  return { years, days };
}

export function formatDate(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export function formatMonthYear(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
}

export function getAgeDisplay(birthday: string): string {
  const { years, days } = calculateAge(birthday);
  if (years === 0) return `${days}天`;
  return `${years}岁${days}天`;
}
