import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useContext } from "react"
import { ExchangeRateContext } from "@/contexts/exchangeRatesWrapper"

export default function CurrencyInput() {
    const form = useForm()
    const { setSelectedCurrency } = useContext(ExchangeRateContext)
    const currencies = [
        { emoji: '🇺🇸', name: 'US Dollar', value: 'usd' },
        { emoji: '🇲🇦', name: 'Moroccan Dirham', value: 'mad' },
        { emoji: '🇪🇺', name: 'Euro', value: 'eur' },
        { emoji: '🇬🇧', name: 'British Pound', value: 'gbp' },
        { emoji: '🇯🇵', name: 'Japanese Yen', value: 'jpy' },
        { emoji: '🇨🇦', name: 'Canadian Dollar', value: 'cad' },
        { emoji: '🇦🇺', name: 'Australian Dollar', value: 'aud' },
        { emoji: '🇨🇳', name: 'Chinese Yuan', value: 'cny' },
        { emoji: '🇨🇭', name: 'Swiss Franc', value: 'chf' },
        { emoji: '🇮🇳', name: 'Indian Rupee', value: 'inr' },
        { emoji: '🇧🇷', name: 'Brazilian Real', value: 'brl' },
        { emoji: '🇷🇺', name: 'Russian Ruble', value: 'rub' },
        { emoji: '🇲🇽', name: 'Mexican Peso', value: 'mxn' },
        { emoji: '🇿🇦', name: 'South African Rand', value: 'zar' },
        { emoji: '🇸🇬', name: 'Singapore Dollar', value: 'sgd' },
        { emoji: '🇭🇰', name: 'Hong Kong Dollar', value: 'hkd' },
        { emoji: '🇰🇷', name: 'South Korean Won', value: 'krw' },
        { emoji: '🇸🇦', name: 'Saudi Riyal', value: 'sar' },
        { emoji: '🇦🇪', name: 'United Arab Emirates Dirham', value: 'aed' },
        { emoji: '🇳🇴', name: 'Norwegian Krone', value: 'nok' },
        { emoji: '🇸🇪', name: 'Swedish Krona', value: 'sek' },
        { emoji: '🇩🇰', name: 'Danish Krone', value: 'dkk' },
        { emoji: '🇳🇿', name: 'New Zealand Dollar', value: 'nzd' },
        { emoji: '🇹🇷', name: 'Turkish Lira', value: 'try' },
        { emoji: '🇹🇭', name: 'Thai Baht', value: 'thb' },
        { emoji: '🇮🇩', name: 'Indonesian Rupiah', value: 'idr' },
        { emoji: '🇵🇭', name: 'Philippine Peso', value: 'php' },
        { emoji: '🇻🇳', name: 'Vietnamese Dong', value: 'vnd' },
        { emoji: '🇦🇷', name: 'Argentine Peso', value: 'ars' },
        { emoji: '🇵🇰', name: 'Pakistani Rupee', value: 'pkr' },
        { emoji: '🇧🇩', name: 'Bangladeshi Taka', value: 'bdt' },
    ];

    function handleChange(data) {
        setSelectedCurrency(data.toUpperCase())
    }

    return (
        <Form {...form}>
            <form className="mt-4 block w-full px-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                className="py-2 pl-5"
                                onValueChange={(e) => {
                                    field.onChange(e)
                                    handleChange(e)
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a currency" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        currencies.map(currency =>
                                            <SelectItem value={currency.value}>{currency.emoji} {currency.name}</SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
