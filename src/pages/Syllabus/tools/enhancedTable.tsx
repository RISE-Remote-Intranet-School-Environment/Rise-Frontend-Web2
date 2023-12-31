import * as React from 'react';
import { alpha,styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';

export interface Data {
    name: string;
    Year:string;
    teacher:string;
    price:number ;
  }

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }
  
const headCells: readonly HeadCell[] = [
{
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
},
{
    id: 'Year',
    numeric: true,
    disablePadding: false,
    label: 'Year',
},
{
    id: 'teacher',
    numeric: true,
    disablePadding: false,
    label: 'teacher',
},
{
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'price',
},

];
export type Order = 'asc' | 'desc';

interface EnhancedTableProps {
numSelected: number;
onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
order: Order;
orderBy: string;
rowCount: number;
}


//Table additional functions
export function EnhancedTableHead(props: EnhancedTableProps) {
const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
    };
return (
    <TableHead>
    <TableRow>
        <TableCell padding="checkbox">
        <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
            'aria-label': 'select all desserts',
            }}
        />
        </TableCell>
        {headCells.map((headCell) => (
        <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
        >
            <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
            >
            {headCell.label}
            {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
            ) : null}
            </TableSortLabel>
        </TableCell>
        ))}
    </TableRow>
    </TableHead>
);
}

interface EnhancedTableToolbarProps {
numSelected: number;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
const { numSelected } = props;
    return (
        <Toolbar
        sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
            bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
        }}
        >
        {numSelected > 0 ? (
            <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
            >
            {numSelected} selected
            </Typography>
        ) : (
            <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
            >
            Syllabus
            </Typography>
        )}
        </Toolbar>
    );
}