import CardStat from "@/Components/molecules/CardStat"
import HeaderTitle from "@/Components/molecules/HeaderTitle"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import AppLayout from "@/Layouts/AppLayout"
import { IconCalendar, IconCalendarMonth, IconCalendarWeek, IconChartDots2 } from "@tabler/icons-react"

export default function Index(props){
    console.log(props.page_data.least_loan_instruments);

    return (
        <div className="flex flex-col w-full pb-32 space-y-4">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconChartDots2}
                />
            </div>

            <h2 className="font-semibold leading-relax text-foreground">Total Peminjaman</h2>

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <CardStat
                data={{ 
                    title: 'Harian',
                    icon: IconCalendar,
                    background: 'text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500',
                    iconClassName: 'text-white'
                }}>
                    <div className="text-2xl font-bold">{props.page_data.total_loans.days}</div>
                </CardStat>
                <CardStat
                data={{ 
                    title: 'Mingguan',
                    icon: IconCalendarWeek,
                    background: 'text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-500',
                    iconClassName: 'text-white'
                }}>
                    <div className="text-2xl font-bold">{props.page_data.total_loans.weeks}</div>
                </CardStat>
                <CardStat
                data={{ 
                    title: 'Bulanan',
                    icon: IconCalendarMonth,
                    background: 'text-white bg-gradient-to-r from-rose-400 via-rose-500 to-rose-500',
                    iconClassName: 'text-white'
                }}>
                    <div className="text-2xl font-bold">{props.page_data.total_loans.months}</div>
                </CardStat>
                <CardStat
                data={{ 
                    title: 'Tahunan',
                    icon: IconCalendar,
                    background: 'text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-500',
                    iconClassName: 'text-white'
                }}>
                    <div className="text-2xl font-bold">{props.page_data.total_loans.years}</div>
                </CardStat>
            </div>

            <h2 className="font-semibold leading-relax text-foreground">Peminjaman Per Alat Musik</h2>
            <div className="flex flex-col justify-between w-full gap-8 lg:flex-row">
                <Card className="w-full lg:w-1/2">
                    <CardHeader>
                        <CardTitle>Alat Musik Paling Banyak Dipinjam</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 py-0 [$_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className='w-full'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Alat Musik</TableHead>
                                    <TableHead>Pemasok</TableHead>
                                    <TableHead>Jumlah</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.page_data.most_loan_instruments.map((most_loan_instrument, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{most_loan_instrument.name}</TableCell>
                                        <TableCell>{most_loan_instrument.brand}</TableCell>
                                        <TableCell>{most_loan_instrument.loans_count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card className="w-full lg:w-1/2">
                    <CardHeader>
                        <CardTitle>Alat Musik Paling Sedikit Dipinjam</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 py-0 [$_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className='w-full'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Alat Musik</TableHead>
                                    <TableHead>Pemasok</TableHead>
                                    <TableHead>Jumlah</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.page_data.least_loan_instruments.map((least_loan_instrument, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{least_loan_instrument.name}</TableCell>
                                        <TableCell>{least_loan_instrument.brand}</TableCell>
                                        <TableCell>{least_loan_instrument.loans_count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title}/>