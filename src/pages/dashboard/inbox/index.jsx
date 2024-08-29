import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import instance from "../../../utils/instance.js";
import Pagination from "@mui/material/Pagination";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Index(props) {

    const [apps, setApps] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        getApps(0)
    }, []);

    const getApps = (page) => {
        instance.get('/v1/app', {
            params: {page}
        }).then(res => {
            console.log(res.data)
            setApps(res.data.elements)
            setTotalPages(res.data?.requestPage?.pageLimit)
        })
    }

    const deleteApp = (item) => {
        instance.delete('/v1/app', {
            params: {id: item?.id}
        }).then(res => {
            getApps(0)
        })
    }


    const handlePage = (e, page) => {
        setPage(page)
        getApps(page - 1)
    }


    return (
        <div>
            <Button
                variant='text'
                size='large'
                color='success'
                startIcon={<InboxIcon/>}
            >Arizalar</Button>

            {
                apps.length === 0 ? <h3 className={'text-center'}>Arizalar mavjud emas</h3>
                    : <div>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 700}} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Ismi</StyledTableCell>
                                        <StyledTableCell align="right">Tel raqam</StyledTableCell>
                                        <StyledTableCell align="right">Pochta</StyledTableCell>
                                        <StyledTableCell align="right">Sana/Vaqt</StyledTableCell>
                                        <StyledTableCell align="right">{"Qo'shimcha"}</StyledTableCell>
                                        <StyledTableCell align="right">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {apps.map((app) => (
                                        <StyledTableRow key={app?.id}>
                                            <StyledTableCell component="th" scope="row">
                                                {app?.fullName}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{app?.phoneNumber}</StyledTableCell>
                                            <StyledTableCell align="right">{app?.email}</StyledTableCell>
                                            <StyledTableCell
                                                align="right">{new Date(app?.createdAt).toLocaleString()}</StyledTableCell>
                                            <StyledTableCell align="right">{app?.description}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Button variant='contained' color='error' onClick={() => deleteApp(app)}>
                                                    <DeleteOutlineIcon/>
                                                </Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePage}
                            variant="outlined"
                            color="success"
                            size='large'
                            sx={{
                                float: 'right', marginTop: '20px',
                            }}
                        />
                    </div>
            }


        </div>
    );
}

export default Index;