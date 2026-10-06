import type { ReactNode } from "react";

type IconName = "search" | "menu" | "close" | "chevron" | "arrow" | "calendar" | "whatsapp" | "route" | "users" | "pin" | "flag" | "pace" | "mail" | "compass";

export function Icon({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    mail: <><path d="M3.4 6.1 Q11.9 5.6 20.6 6.1 Q21.1 11.9 20.6 17.9 Q11.9 18.4 3.4 17.9 Q2.9 11.9 3.4 6.1 Z" /><path d="M3.9 6.9 Q8.1 10.6 11.9 12.6 Q15.9 10.6 20.1 6.9" /></>,
    search: <><path d="M10.6 3.4 Q16.1 3.1 17.4 8.2 T13.9 16.2 Q8.6 17.4 5.2 13.4 T7.2 4.7 Q8.8 3.6 10.6 3.4" /><path d="M15.6 15.2 Q18.4 18 20.8 20.6" /></>,
    menu: <><path d="M3.4 7.1 Q11.9 6.6 20.6 7.1" /><path d="M3.4 12.1 Q11.9 11.6 20.6 12.1" /><path d="M3.4 17.1 Q11.9 16.6 20.6 17.1" /></>,
    close: <><path d="M5.4 5.1 Q12.1 11.9 18.9 18.6" /><path d="M18.9 5.1 Q12.1 11.9 5.4 18.6" /></>,
    chevron: <path d="M5.4 9.1 Q8.9 12.4 12 15.1 Q15.1 12.4 18.6 9.1" />,
    arrow: <><path d="M3.6 12 Q11.9 11.6 20.1 12" /><path d="M14.6 6.4 Q17.6 9.4 20.4 12 Q17.6 14.6 14.6 17.6" /></>,
    calendar: <><path d="M4.4 6.6 Q12 6.1 19.6 6.6 Q20.1 13 19.6 19.4 Q12 19.9 4.4 19.4 Q3.9 13 4.4 6.6 Z" /><path d="M4.6 10.4 Q12 10 19.4 10.4" /><path d="M8.4 3.6 Q8.3 5.1 8.4 6.4" /><path d="M15.6 3.6 Q15.7 5.1 15.6 6.4" /></>,
    route: <><path d="M3.4 7.1 Q11.9 6.6 20.6 7.1" /><path d="M3.4 12.1 Q11.9 11.6 20.6 12.1" /><path d="M3.4 17.1 Q11.9 16.6 20.6 17.1" /></>,
    users: <><path d="M9.4 4.6 Q12.6 4.4 12.8 7.6 T9.6 10.8 Q6.4 10.6 6.3 7.5 T9.4 4.6" /><path d="M3.6 19.4 Q3.9 13.6 9.5 13.4 T15.4 19.4" /><path d="M15.6 5.2 Q18.4 5.8 18.3 8.2 T15.5 11" /><path d="M17.4 13.8 Q20.5 14.8 20.4 19.4" /></>,
    pin: <><path d="M12 20.6 Q5.4 13.9 5.5 9.4 Q5.7 3.6 12 3.5 T18.5 9.4 Q18.6 13.9 12 20.6 Z" /><path d="M10 9.3 Q10.1 7.2 12 7.2 T14 9.3 Q13.9 11.4 12 11.4 T10 9.3" /></>,
    flag: <><path d="M6.2 3.8 Q5.9 12 6.2 20.2" /><path d="M6.2 5 Q11.4 3.6 14.6 5.4 T19.4 5.2 Q19.7 8.4 19.4 11.6 Q16.2 13.2 14.6 11.8 T6.2 12.2" /></>,
    compass: <><path d="M12 2.6 Q21.5 2.9 21.4 12.1 T12 21.4 Q2.5 21 2.6 11.9 T12 2.6" /><path d="M15.9 8.3 Q13.1 9.4 10.2 10.4 Q9.2 13.2 8.1 15.9 Q11 14.7 13.8 13.7 Q14.9 11 15.9 8.3 Z" /></>,
    pace: <><rect x="3" y="14" width="5" height="7" rx="1.5" fill="currentColor" stroke="none"/><rect x="9.5" y="9.5" width="5" height="11.5" rx="1.5" fill="currentColor" stroke="none"/><rect x="16" y="5" width="5" height="16" rx="1.5" fill="currentColor" stroke="none" opacity=".28"/></>,
    whatsapp: <><path d="M12 3.1 Q20.9 3.4 20.9 12.1 Q20.9 20.9 12 20.9 Q9.6 20.9 7.6 19.9 Q5.4 20.6 3.1 21.1 Q3.9 18.6 4.4 16.6 Q3.1 14.6 3.1 12.1 Q3.4 3.4 12 3.1 Z" /><path d="M9.4 8.4 Q10.4 8.1 10.9 9.4 Q11.4 10.6 10.6 11.1 Q10.4 12.6 12.1 13.9 Q13.4 14.9 14.1 14.1 Q14.9 13.1 15.9 13.9 Q16.9 14.6 16.1 15.4 Q15.1 16.4 13.1 15.6 Q10.9 14.6 9.4 12.6 Q8.1 10.9 8.4 9.4 Q8.6 8.6 9.4 8.4 Z" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>{paths[name]}</svg>;
}

export function Contours({ className = "" }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 340 460" fill="none" className={className}><g transform="translate(170 230) rotate(14)">{[1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4].map((scale) => <path key={scale} d="M0-58C33-56 57-33 55-4C53 25 29 55-2 57C-33 59-57 33-57 2C-57-29-33-60 0-58Z" transform={`scale(${scale})`} stroke="currentColor" strokeOpacity=".15" />)}</g></svg>;
}
