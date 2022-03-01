import { AccountBase, AccountType } from "plaid";

type StatTableDefinition = {
    accountStats: {
        functions: {
            [statName: string]: {
                accountTypes: AccountType[],
                callback: any
            }[]
        },
        values: {
            [statName: string]: number
        }
    }
}

export class StatsEngine {
    private static StatTable: StatTableDefinition = {
        accountStats: { functions: {}, values: {} }
    }

    private static AccountStat = (name: string, accountTypes: AccountType[] = []) =>
        (_target: Object, _propertyKey: string, descriptor: PropertyDescriptor) => {
            const payload = {
                accountTypes: accountTypes,
                callback: descriptor.value
            }

            if (name in StatsEngine.StatTable.accountStats) {
                StatsEngine.StatTable.accountStats.functions[name].push(payload)
            } else {
                StatsEngine.StatTable.accountStats.functions[name] = [payload]
            }
            return descriptor;
        }

    public static getAccountStats() {
        return StatsEngine.StatTable.accountStats.values 
    }

    public static computeAccountStats(accounts: AccountBase[]) {
        for (const stat of Object.keys(StatsEngine.StatTable.accountStats.functions)) {
            StatsEngine.StatTable.accountStats.values[stat] = 0

            const processFunctions = StatsEngine.StatTable.accountStats.functions[stat]

            processFunctions.forEach(definition => {
                const { accountTypes, callback } = definition
                const filteredAccountList = []

                for (const account of accounts) {
                    if (accountTypes.includes(account.type)) {
                        filteredAccountList.push(account)
                    }
                }

                
                StatsEngine.StatTable.accountStats.values[stat] += callback(filteredAccountList)
            })
        }
    }

    // STAT DEFINITIONS ================================================================

    @StatsEngine.AccountStat('totalAccounts', [
        AccountType.Depository,
        AccountType.Brokerage,
        AccountType.Investment,
        AccountType.Loan,
        AccountType.Credit
    ])
    public static totalAccounts(accounts: AccountBase[]) {
        return accounts.length
    }

    @StatsEngine.AccountStat('totalInvestmentCount', [
        AccountType.Brokerage,
        AccountType.Investment,
    ])
    public static totalInvestmentCount(accounts: AccountBase[]) {
        return accounts.length
    }

    @StatsEngine.AccountStat('totalBankCount', [
        AccountType.Depository,
    ])
    public static totalBankCount(accounts: AccountBase[]) {
        return accounts.length
    }

    @StatsEngine.AccountStat('totalCreditCardCount', [
        AccountType.Credit,
    ])
    public static totalCreditCardCount(accounts: AccountBase[]) {
        return accounts.length
    }

    @StatsEngine.AccountStat('totalLoanCount', [
        AccountType.Loan,
    ])
    public static totalLoanCount(accounts: AccountBase[]) {
        return accounts.length
    }

    @StatsEngine.AccountStat('netWorth', [
        AccountType.Depository,
        AccountType.Brokerage,
        AccountType.Investment
    ])
    public static positiveNetWorth(accounts: AccountBase[]) {
        let total = 0
        for (const account of accounts) {
            if (account.balances.current) {
                total += account.balances.current
            }
        }
        return total
    }

    @StatsEngine.AccountStat('netWorth', [AccountType.Loan, AccountType.Credit])
    public static negativeNetWorth(accounts: AccountBase[]) {
        let total = 0
        for (const account of accounts) {
            if (account.balances.current) {
                total -= account.balances.current
            }
        }
        return total
    }

    @StatsEngine.AccountStat('totalDebt', [AccountType.Loan, AccountType.Credit])
    public static totalDebt(accounts: AccountBase[]) {
        let total = 0
        for (const account of accounts) {
            if (account.balances.current) {
                total += account.balances.current
            }
        }
        return total
    }

    @StatsEngine.AccountStat('creditCardDebt', [AccountType.Credit])
    public static creditCardDebt(accounts: AccountBase[]) {
        let total = 0
        for (const account of accounts) {
            if (account.balances.current) {
                total += account.balances.current
            }
        }
        return total
    }

    @StatsEngine.AccountStat('loanDebt', [AccountType.Loan])
    public static loanDebt(accounts: AccountBase[]) {
        let total = 0
        for (const account of accounts) {
            if (account.balances.current) {
                total += account.balances.current
            }
        }
        return total
    }

    @StatsEngine.AccountStat('totalAssets', [
        AccountType.Depository,
        AccountType.Brokerage,
        AccountType.Investment
    ])
    public static totalAssets(accounts: AccountBase[]) {
        let total = 0
        for (const account of accounts) {
            if (account.balances.current) {
                total += account.balances.current
            }
        }
        return total
    }

    @StatsEngine.AccountStat('liquidAssets', [
        AccountType.Depository,
        AccountType.Brokerage,
        AccountType.Investment
    ])
    public static liquidAssets(accounts: AccountBase[]) {
        let total = 0
        for (const account of accounts) {
            if (account.balances.available) {
                total += account.balances.available
            }
        }
        return total
    }

    @StatsEngine.AccountStat('investmentAssets', [
        AccountType.Brokerage,
        AccountType.Investment
    ])
    public static investmentAssets(accounts: AccountBase[]) {
        let total = 0
        for (const account of accounts) {
            if (account.balances.current) {
                total += account.balances.current
            }
        }
        return total
    }

    @StatsEngine.AccountStat('nonLiquidAssets', [
        AccountType.Depository,
        AccountType.Brokerage,
        AccountType.Investment
    ])
    public static nonLiquidAssets(accounts: AccountBase[]) {
        let total = 0
        for (const account of accounts) {
            if (account.balances.current && account.balances.available) {
                total += account.balances.current - account.balances.available
            }
        }
        return total
    }
}
