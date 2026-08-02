interface NavItem {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    external?: boolean;
}

interface NavGroup {
    label: string;
    items: NavItem[];
}

interface StatItem {
    icon: React.ElementType;
    label: string;
    value: string;
    trend: string;
    direction: "up" | "down" | "neutral";
    note: string;
}