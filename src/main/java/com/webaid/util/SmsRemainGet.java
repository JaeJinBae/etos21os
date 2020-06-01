package com.webaid.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;

import org.springframework.http.ResponseEntity;

public class SmsRemainGet {
	public String smsRemain(){
		ResponseEntity<Map<String, String>> entity = null;
		String res = "";
		try{

			/**************** 최근 전송 목록 ******************/
			/* "result_code":결과코드,"message":결과문구, */
			/** list : 전송된 목록 배열 ***/
			/******************** 인증정보 ********************/
			String sms_url = "https://apis.aligo.in/remain/"; // 전송요청 URL
			
			String sms = "";
			sms += "user_id=" + "21centuryos"; // SMS 아이디 
			sms += "&key=" + "s6zdl39cx33t8zg2g0ojoki4bsoxpje9"; //인증키
			
			
			/******************** 인증정보 ********************/
			
			URL url = new URL(sms_url);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoInput(true);
			conn.setDoOutput(true);
			conn.setUseCaches(false);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			
			OutputStream os = conn.getOutputStream();
			os.write(sms.getBytes());
			os.flush();
			os.close();
			
			String result = "";
			String buffer = null;
			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			
			
			while((buffer = in.readLine())!=null){
				result += buffer;
			}
			
			in.close();
			
			System.out.println(result);
			String[] splitRes = result.split(",");
			for(int i=0; i< splitRes.length; i++){
				System.out.println(splitRes[i]);
			}
			
			
			res = splitRes[2].split(":")[1]+"/"+splitRes[3].split(":")[1];

		}catch(MalformedURLException e1){
			System.out.println(e1.getMessage());
		}catch(IOException e2){
			System.out.println(e2.getMessage());
		}
		return res;
	}
}
