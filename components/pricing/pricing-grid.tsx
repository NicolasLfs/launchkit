import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PLANS, formatPlanPrice } from "@/lib/stripe/plans";
import { cn } from "@/lib/utils";
import SubscribeButton from "./subscribe-button";

export default function PricingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {PLANS.map((plan) => (
        <Card
          key={plan.id}
          className={cn(
            "relative border-border bg-card/80 backdrop-blur-sm transition-all duration-200",
            plan.highlighted &&
              "border-primary/50 shadow-[0_0_32px_rgba(16,185,129,0.12)] scale-[1.02]",
          )}
        >
          {plan.badge ? (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-medium">
                {plan.badge}
              </span>
            </div>
          ) : null}

          <CardHeader className="pt-8">
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold text-foreground">
                {formatPlanPrice(plan)}
              </span>
            </div>
          </CardHeader>

          <CardContent>
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check
                    size={16}
                    className="text-primary shrink-0 mt-0.5"
                    aria-hidden
                  />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <SubscribeButton plan={plan} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
