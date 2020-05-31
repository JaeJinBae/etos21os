package com.webaid.util;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.webaid.domain.ClinicVO;
import com.webaid.domain.FixTherapyReservationVO;
import com.webaid.domain.NormalTherapyReservationVO;

public class ExcelDown{

	
	public void excelDown(int eno, String ename, String date, Map<String, Object> list, HttpServletResponse response) throws IOException {
		System.out.println("엑셀다운 Util 진입");
		int year = Integer.parseInt(date.split("-")[0]);
		int month = Integer.parseInt(date.split("-")[1])-1;

		Calendar cal = Calendar.getInstance();
		cal.set(year, month, 1);
		int lastDate = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
		
		List<NormalTherapyReservationVO> ntrList = (List<NormalTherapyReservationVO>) list.get("ntrList");
		List<FixTherapyReservationVO> ftrList = (List<FixTherapyReservationVO>) list.get("ftrList");
		List<ClinicVO> clinicList = (List<ClinicVO>) list.get("clinicList");
		int ntrListSize = ntrList.size();
		int ftrListSize = ftrList.size();
		
		Collections.sort(ntrList);
		Collections.sort(ftrList);
		
		//엑셀에 환자명 넣기 위해 환자이름-차트번호 비교해서 중복제거
		ArrayList<String> pnoList = new ArrayList<String>();
		ArrayList<String> pList = new ArrayList<String>();
		for(int i=0; i<ntrList.size(); i++){
			pnoList.add((ntrList.get(i).getPname()+"-"+ntrList.get(i).getChart_no()).trim());
		}
		for(int i=0; i<ftrList.size(); i++){
			pnoList.add((ftrList.get(i).getPname()+"-"+ftrList.get(i).getChart_no()).trim());
		}
		//환자명 가나다 순으로 정렬
		Collections.sort(pnoList);
		
		for(int i=0; i< pnoList.size(); i++){
			if(!pList.contains(pnoList.get(i))){
				pList.add(pnoList.get(i));
			}
		}
		//환자명 가나다 순으로 정렬
		Collections.sort(pList);
		
		try {
			XSSFWorkbook objWorkBook = new XSSFWorkbook();
			XSSFSheet objSheet = null;
			XSSFRow objRow = null;
			XSSFCell objCell = null;
			XSSFCellStyle objStyle = objWorkBook.createCellStyle();
			objStyle.setAlignment(CellStyle.ALIGN_CENTER);
			
			objSheet = objWorkBook.createSheet("Sheet1");
			
			objRow = objSheet.createRow(0);

			objCell = objRow.createCell(0);
			objCell.setCellValue(ename+" 치료사 "+year+"년"+(month+1)+"월"+"통계");
			objCell.setCellStyle(objStyle);
			objRow.getSheet().addMergedRegion(new CellRangeAddress(0, 0, 0, 3));

			objRow = objSheet.createRow(1);

			// 행 높이 지정
			objRow.setHeight((short) 0x150);

			// 셀에 데이터 넣지
			objCell = objRow.createCell(0);
			objCell.setCellValue("번호");
			objCell.setCellStyle(objStyle);
			
			objCell = objRow.createCell(1);
			objCell.setCellValue("환자명");
			objCell.setCellStyle(objStyle);
			objCell = objRow.createCell(2);
			objCell.setCellValue("차트번호");
			objCell.setCellStyle(objStyle);
			
			for(int i=3; i<lastDate+3; i++){
				objCell = objRow.createCell(i);
				objCell.setCellValue(i-2+"일");
				objCell.setCellStyle(objStyle);
			}
			
			//순번, 환자명, 차트번호 엑셀에 입력
			String[] strArr;
			for (int i=0; i<pList.size(); i++) {
				strArr = pList.get(i).split("-");
				
				objRow = objSheet.createRow(i+2);

				objCell = objRow.createCell(0);
				objCell.setCellValue(i+1);
				objCell.setCellStyle(objStyle);
				
				objCell = objRow.createCell(1);
				objCell.setCellValue(strArr[0]);
				objCell.setCellStyle(objStyle);
				
				objCell = objRow.createCell(2);
				objCell.setCellValue(strArr[1]);
				objCell.setCellStyle(objStyle);
				for(int j=3; j<lastDate+3; j++){
					objRow.createCell(j).setCellStyle(objStyle);;
				}
			}
			
			//환자별 날짜에 받은 치료 입력
			String selectCell;
			String selectCellVal;
			
			for(int i=0;i<pList.size(); i++){
				objRow = objSheet.getRow(i+2);
				selectCell = objRow.getCell(2).getStringCellValue();
				for(int j=0;j<ntrListSize; j++){
					if(selectCell.equals(ntrList.get(j).getChart_no()+"")){
						int idx = Integer.parseInt(ntrList.get(j).getRdate().split("-")[2]);
						selectCellVal = objRow.getCell(idx+2).getStringCellValue();
						if(selectCellVal.equals("")){
							objRow.getCell(idx+2).setCellValue(ntrList.get(j).getClinic_name());
						}else{
							objRow.getCell(idx+2).setCellValue(selectCellVal+", "+ntrList.get(j).getClinic_name());
						}
						
					}
				}
				for(int j=0;j<ftrListSize; j++){
					if(selectCell.equals(ftrList.get(j).getChart_no()+"")){
						int idx = Integer.parseInt(ftrList.get(j).getRdate().split("-")[2]);
						selectCellVal = objRow.getCell(idx+2).getStringCellValue();
						if(selectCellVal.equals("")){
							objRow.getCell(idx+2).setCellValue(ftrList.get(j).getClinic_name());
						}else{
							objRow.getCell(idx+2).setCellValue(selectCellVal+", "+ftrList.get(j).getClinic_name());
						}
						
					}
				}
			}
			
			objRow = objSheet.createRow(objSheet.getLastRowNum()+1);
			objCell = objRow.createCell(0);
			objCell.setCellValue("Total");
			objCell.setCellStyle(objStyle);
			objSheet.addMergedRegion(new CellRangeAddress(objRow.getRowNum(), objRow.getRowNum(), 0, 2));
			
			String sCell;
			String eCell;
			int tcnt = 0;
			String dateVal = "";
			int eRowNum = objSheet.getLastRowNum()-1;//치료종류별 현황에 반복문에 쓰려고 미리 생성
			//날짜별 치료 합계
			for(int i=3; i<objSheet.getRow(1).getLastCellNum(); i++){
				dateVal = (i-2<10)?"0"+(i-2):(i-2)+"";
				tcnt=0;
				for(int j=0; j<ntrListSize;j++){
					if(ntrList.get(j).getRdate().equals(date+"-"+dateVal)){
						tcnt++;
					}
				}
				for(int j=0; j<ftrListSize;j++){
					if(ftrList.get(j).getRdate().equals(date+"-"+dateVal)){
						tcnt++;
					}
				}
				
				objCell = objRow.createCell(i);
				objCell.setCellValue(tcnt);
				objCell.setCellStyle(objStyle);
			}
			
			
			//치료 종류별 현황 제목
			objRow = objSheet.createRow(objSheet.getLastRowNum()+2); 
			objCell = objRow.createCell(0);
			objCell.setCellValue("치료 종류별 현황");
			objCell.setCellStyle(objStyle);
			objSheet.addMergedRegion(new CellRangeAddress(objRow.getRowNum(), objRow.getRowNum(), 0, 2));
			
			
			//치료 종류별 현황 내용
			objRow = objSheet.createRow(objSheet.getLastRowNum()+1);
			objCell = objRow.createCell(0);
			objCell.setCellValue("번호");
			objCell.setCellStyle(objStyle);
			
			objCell = objRow.createCell(1);
			objCell.setCellValue("치료명");
			objCell.setCellStyle(objStyle);
			
			objCell = objRow.createCell(2);
			objCell.setCellValue("Total");
			objCell.setCellStyle(objStyle);
			
			for(int i=0; i<clinicList.size(); i++){
				objRow = objSheet.createRow(objSheet.getLastRowNum()+1);
				
				objCell = objRow.createCell(0);
				objCell.setCellValue(i+1);
				objCell.setCellStyle(objStyle);
				
				objCell = objRow.createCell(1);
				objCell.setCellValue(clinicList.get(i).getCode_name());
				objCell.setCellStyle(objStyle);
				
				objCell = objRow.createCell(2);
				objCell.setCellStyle(objStyle);
				for(int j=3; j<objSheet.getRow(1).getLastCellNum(); j++){
					dateVal = (j-2<10)?"0"+(j-2):(j-2)+"";
					tcnt=0;
					for(int k=0; k<ntrListSize; k++){
						if(ntrList.get(k).getRdate().equals(date+"-"+dateVal) && ntrList.get(k).getClinic_name().equals(clinicList.get(i).getCode_name())){
							tcnt++;
						}
					}
					for(int k=0; k<ftrListSize; k++){
						if(ftrList.get(k).getRdate().equals(date+"-"+dateVal) && ftrList.get(k).getClinic_name().equals(clinicList.get(i).getCode_name())){
							tcnt++;
						}
					}
					sCell = objSheet.getRow(2).getCell(j).getReference();
					eCell = objSheet.getRow(eRowNum).getCell(j).getReference();
					objCell = objRow.createCell(j);
					objCell.setCellValue(tcnt);
					objCell.setCellStyle(objStyle);
				}
				objRow.getCell(2).setCellFormula("SUM("+objRow.getCell(3).getReference()+":"+objRow.getCell(objRow.getLastCellNum()-1).getReference()+")");
			}
			
			response.setContentType("Application/Msexcel");
			response.setHeader("Content-Disposition",
					"ATTachment; Filename=" + URLEncoder.encode("통계_"+ename+"치료사_" +year+"년"+(month+1)+"월", "UTF-8") + ".xlsx");

			OutputStream fileOut = response.getOutputStream();
			objWorkBook.write(fileOut);
			fileOut.close();

			response.getOutputStream().flush();
			response.getOutputStream().close();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
}
