import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, List,ListItem,ListItemButton,ListItemText, Drawer, IconButton, ListItemIcon } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import DeleteIcon from '@mui/icons-material/Delete';
import {EnhancedTableToolbar, Data, EnhancedTableHead, Order} from './Syllabus/tools/enhancedTable'



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


export default function SyllabusPage() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('Year');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [isOpen, setIsOpen]= React.useState(false);

  //Not implemented yet
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
  //Filter the table with dropdown menu
  const [selection, setSelection] = React.useState("");
  function handleChange(event: SelectChangeEvent) { 
    setSelection(event.target.value);
    let _vals = event.target.value
      ? API_DATA.filter(r => r.Year === event.target.value)
      : API_DATA;
    setTableData(_vals);
    setSelected([]);
  }
  //Adding elements to cart
  const [cart, setCart] = React.useState<readonly Data[]>([]);
  let inCart:string[]=[]
  function addCart(){
    let newCart:Data[]=[]
    selected.map(row=>
      {
        var x:Data=API_DATA.filter(r=>r.name===row)[0]
        newCart = newCart.concat(x)
    })
    newCart= (newCart.filter(element =>{
      return !(cart.includes(element))
    }))
    setCart(cart.concat(newCart))
    return 0
  }
  ///
  function delCart(name:string){
    setCart(cart.filter(r=>r.name!=name))
    return 0
  }
  ///
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    if(cart.length>0){
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPay(false);
  }
  const [pay, setPay] = React.useState(false);
  const handleClickPay= () =>{
    setPay(true)
  }
  return ( 
    
    <Box display="flex" 
    alignItems="center"
    justifyContent="center"
    sx={{ width: '100%' }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Order?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert  -dialog-description">
            Proceed to payment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickPay} autoFocus>
            Go to Payment
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
      open={pay}
      onClose={handleClose}>
        <DialogContent>
            <DialogContentText id="alert  -dialog-description">
              Thank you for your purchase
            </DialogContentText>
        </DialogContent>
      </Dialog>
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
        onClose={()=>setIsOpen(false)}>
      <List>
        
        {cart.map((items,i)=> //loops on the cart 
        <ListItem 
        sx={{}}
        disablePadding key={items.name}>
            <ListItemButton>
              <ListItemText primary= {items.name+"    Price: "+items.price} />
            </ListItemButton>
            <OutlinedInput
            readOnly={true  }
            key ={items.price}
            type="number"
            placeholder="1"
            />
            <ListItemButton
            onClick={(e)=>{delCart(items.name)}}>
              <ListItemIcon> <DeleteIcon/> </ListItemIcon>
            </ListItemButton>
        </ListItem>)}
        <Button onClick={(e)=>{handleClickOpen()}}
        >
          Confirm 
        </Button>
      </List>
      </Drawer>
    </Box>
  );
}