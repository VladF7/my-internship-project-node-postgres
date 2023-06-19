import pdfMake from 'pdfmake'
import path from 'path'
import { fileURLToPath } from 'url'
import { getFormatDateTime } from '../date.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fonts = {
  Roboto: {
    normal: path.join(__dirname, '../pdfMake/fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, '../pdfMake/fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, '../pdfMake/fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, '../pdfMake/fonts/Roboto-MediumItalic.ttf')
  }
}

export const generatePdf = (order) => {
  const docDefinition = generateDocDefinftion(order)
  return new Promise((resolve, reject) => {
    const printer = new pdfMake(fonts)
    const pdfDoc = printer.createPdfKitDocument(docDefinition)

    let chunks = []

    pdfDoc.on('data', (chunk) => {
      chunks.push(chunk)
    })

    pdfDoc.on('end', () => {
      const result = Buffer.concat(chunks)
      resolve(result)
    })

    pdfDoc.on('error', (error) => {
      reject(error)
    })

    pdfDoc.end()
  })
}

const generateTableData = (order) => {
  return [
    ['Order ID', order.id],
    ['Customer name', order.customer.name],
    ['Customer email', order.customer.email],
    ['City', order.city.name],
    ['Master name', order.master.name],
    ['Master email', order.master.user.email],
    ['Clock size', order.clock.size],
    ['Time to fix', order.clock.timeToFix],
    ['Start order time', getFormatDateTime(order.startTime)],
    ['End order time', getFormatDateTime(order.endTime)],
    ['Price for hour', order.city.priceForHour],
    ['Total price', order.price]
  ]
}

const generateDocDefinftion = (order) => {
  const tableData = generateTableData(order)
  const QRcodeText = tableData.map((row) => row.join(': ')).join('\n')
  return {
    pageSize: 'A4',
    content: [
      {
        columns: [
          {
            stack: [
              {
                image: path.join(__dirname, '../pdfMake/logo/clock_logo.png'),
                height: 100,
                width: 115,
                alignment: 'left'
              }
            ]
          },
          {
            stack: [
              {
                qr: QRcodeText,
                fit: 100,
                alignment: 'right'
              }
            ]
          }
        ]
      },
      {
        text: 'Your order on Clockwise Clockware has been successfully completed',
        fontSize: 16,
        alignment: 'center',
        margin: [20, 20]
      },
      {
        text: 'Order information',
        fontSize: 12,
        margin: [0, 10]
      },
      {
        table: {
          widths: ['*', '*'],
          body: tableData
        }
      }
    ]
  }
}
