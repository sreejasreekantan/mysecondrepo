public class weatherReportAPI {

     public class WrapperData{
        public String City{get;set;}
        public String dateSelected{get;set;}
        public String weather{get;set;}
    }
    
    public  void getWeatherReport(String city,Date dt){
        String APIKey	='739135502cmsh88e9a3de9bf9547p178373jsnaedcc5aab399';
        Http http	=	new Http();
        HttpRequest request	=	 new HttpRequest();
        request.setMethod('GET');
        //request.setEndpoint('https://weatherapi-com.p.rapidapi.com/current.json?q='+city);//realtime
        request.setEndpoint('https://weatherapi-com.p.rapidapi.com/forecast.json?q='+city+'&dt='+dt);//forecast weather upto 14 days from today.Date can be between today+next 14 days
        request.setHeader('X-RapidAPI-Key', APIKey);
        request.setHeader('X-RapidAPI-Host', 'weatherapi-com.p.rapidapi.com');
        HttpResponse response	= http.send(request);
        system.debug('responce data'+response.getBody());
        system.debug('response deserialized'+JSON.deserializeUntyped(response.getBody()));
    }
}