    trend = []
    for m in months:
        retained = 0
        churned = 0
        for c in customers:
            signup_m = c[\"signup_date\"][:7]
            last_m = c[\"last_active\"][:7]
            if signup_m <= m:
                if c[\"status\"] == \"churned\" and last_m == m:
                    churned += 1
                elif c[\"status\"] == \"active\" and last_m >= m:
                    retained += 1
                elif c[\"status\"] == \"churned\" and last_m > m:
                    retained += 1  # was still active in month m
        active = retained
        base = active + churned