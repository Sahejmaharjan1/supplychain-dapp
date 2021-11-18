import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Web3 from 'web3'
import { useRef, useState } from 'react'
import { Button } from 'antd'
import Auth from '@aws-amplify/auth'
import { useRouter } from 'next/dist/client/router'
import QRcode from 'qrcode'
import dynamic from 'next/dynamic'
import AuthLayout from '../src/Features/Components/CoreUI/Layout/AuthLayout/AuthLayout'

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })
export default function Home() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');

  const qrRef = useRef(null);

  const onLogOut = async () => {
    await Auth.signOut();
    router.reload()
  }
  // async function loadBlockchainData() {
  //   const web3 = new Web3(Web3.currentProvider || "http://localhost:8545")
  //   const accounts = await web3.eth.getAccounts()
  //   // this.setState({ account: accounts[0] })
  //   console.log('accounts[0]', accounts)
  //   // const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)

  //   // const taskCount = await todoList.methods.taskCount().call()
  //   // this.setState({ taskCount })
  //   // for (var i = 1; i <= taskCount; i++) {
  //   //   const task = await todoList.methods.tasks(i).call()
  //   //   this.setState({
  //   //     tasks: [...this.state.tasks, task]
  //   //   })
  // }
  // useEffect(() => {
  //   loadBlockchainData()
  // }, [])
  const generateQrCode = async () => {
    try {
      const response = await QRcode.toDataURL('test');
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  }
  const onScanFile = () => {
    qrRef?.current?.openImageDialog();
  }
  return (<AuthLayout />)

}
