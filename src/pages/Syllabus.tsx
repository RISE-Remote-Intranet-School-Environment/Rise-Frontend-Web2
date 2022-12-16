import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, List,ListItem,ListItemButton,ListItemText, Drawer, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

interface Data {
  name: string;
  Year:string;
  teacher:string;
  price:number ;
}

//This data should be fetched from the Database in the future
const API_DATA = [
  { name:'MATH', Year: "2BA", teacher: "HIL", price:25 },
  { name:'GESTION', Year: "5MA", teacher: "MLT",price:10 },
  { name:'INFO', Year: "1BA", teacher: "J3L",price:5 },
  { name:'1', Year: "2BA", teacher: "HIL", price:25 },
  { name:'2', Year: "5MA", teacher: "MLT",price:10 },
  { name:'3', Year: "1BA", teacher: "J3L",price:5 },

  { name:'4', Year: "2BA", teacher: "HIL", price:22 },
  { name:'5', Year: "5MA", teacher: "MLT",price:101 },
  { name:'6', Year: "1BA", teacher: "J3L",price:5 },
  { name:'7', Year: "2BA", teacher: "HIL", price:25 },
  { name:'8', Year: "5MA", teacher: "MLT",price:10 },
  { name:'9', Year: "1BA", teacher: "J3L",price:5 },
  { name:'10', Year: "2BA", teacher: "HIL", price:25 },

];


type Order = 'asc' | 'desc';



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

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

//Table additional functions
function EnhancedTableHead(props: EnhancedTableProps) {
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

//Top of the screen
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
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

export default function SyllabusPage() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('Year');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [cart, setCart] = React.useState<readonly Data[]>([]);
  const [isOpen, setIsOpen]= React.useState(false);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = tableData.map((n) => (n.name));
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    console.log(newPage,page)
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const [tableData, setTableData] = React.useState(API_DATA);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;
  //Filter the table with dropdown
  const [selection, setSelection] = React.useState("");
  function handleChange(event: SelectChangeEvent) {
    setSelection(event.target.value);
    console.log("ev",API_DATA)
    let _vals = event.target.value
      ? API_DATA.filter(r => r.Year === event.target.value)
      : API_DATA;
    setTableData(_vals);
    setSelected([]);
    console.log("tbs",tableData)
  }
  //Adding elements to cart
  let inCart:string[]=[]
  function addCart(){
    cart.map(item=>{
      inCart= inCart.concat(item.name)
    })
    selected.map(row=>
      {
        var x:Data=API_DATA.filter(r=>r.name===row)[0]
        if(cart && cart.length>0){
          cart.map(item=>{
          if (inCart.includes(row)){ //item is in cart
            console.log('item',item)}
            else{ //item not in cart
              console.log('selected',row,'item',item)
              setCart(cart.concat(x));
            }
          })
        }
        else {
          console.log('row',row)
          setCart(cart.concat(x));
        }   
    })
  }
  return (  
    <Box display="flex" 
    alignItems="center"
    justifyContent="center"
    sx={{ width: '100%' }}>
      <Paper sx={{ width: '50%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
        <Select
        style={{ width: "20%" }}
        value={selection}
        onChange={handleChange}
        name="Year"
        displayEmpty
        >
          <MenuItem value={"" }>ALL</MenuItem>
          <MenuItem value={"2BA"}>2BA</MenuItem>
          <MenuItem value={"3BA"}>3BA</MenuItem>
          <MenuItem value={"5MA"}>5MA</MenuItem>
          {/*Add Elements to dropdown here */}
        </Select>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
            />
            <TableBody>
              {tableData.sort()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.Year}</TableCell>
                      <TableCell align="right">{row.teacher}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      {/*Add Column to table here */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Button onClick={() => {
        addCart();
      }}>Add to Cart </Button>
      <IconButton onClick={()=>setIsOpen(true)}>
        <ShoppingCartIcon/>
      </IconButton>
      <Drawer 
        anchor='right' 
        open={isOpen}
        onClose={()=>setIsOpen(false)}><List>
        {cart.map((items,i)=><ListItem disablePadding key={items.name}>
            <ListItemButton>
              <ListItemText primary= {items.name+"    Price: "+items.price} />
            </ListItemButton>
          </ListItem>)}
      </List></Drawer>
    </Box>
  );
}