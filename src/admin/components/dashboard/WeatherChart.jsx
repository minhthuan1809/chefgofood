import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import {
  WiDaySunny,
  WiCloudy,
  WiDayCloudy,
  WiDayRain,
  WiDaySnow,
  WiDayFog,
  WiDayStormShowers,
} from "react-icons/wi";
import { BsDot } from "react-icons/bs";

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Chuyển đổi mã thời tiết sang icon tương ứng
  const getWeatherIcon = (code) => {
    // WMO Weather interpretation codes (WW)
    if (code === 0 || code === 1) return WiDaySunny;
    if (code >= 2 && code <= 3) return WiDayCloudy;
    if (code >= 45 && code <= 48) return WiDayFog;
    if (code >= 51 && code <= 67) return WiDayRain;
    if (code >= 71 && code <= 77) return WiDaySnow;
    if (code >= 80 && code <= 99) return WiDayStormShowers;
    return WiCloudy;
  };

  // Chuyển đổi mã thời tiết sang mô tả
  const getWeatherDescription = (code) => {
    if (code === 0) return "Trời nắng";
    if (code === 1) return "Ít mây";
    if (code >= 2 && code <= 3) return "Nhiều mây";
    if (code >= 45 && code <= 48) return "Sương mù";
    if (code >= 51 && code <= 67) return "Mưa nhỏ";
    if (code >= 71 && code <= 77) return "Tuyết rơi";
    if (code >= 80 && code <= 99) return "Mưa giông";
    return "Không xác định";
  };

  useEffect(() => {
    // Cập nhật thời gian mỗi phút
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Lấy dữ liệu thời tiết
    const fetchWeather = async () => {
      try {
        // Tọa độ Hà Nội
        const lat = 21.0285;
        const lon = 105.8542;
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&timezone=Asia/Ho_Chi_Minh&forecast_days=7`
        );
        const data = await response.json();

        // Xử lý dữ liệu để lấy thông tin cho 7 ngày
        const processedData = [];
        const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() + i);
          const dayIndex = date.getDay();

          // Lấy nhiệt độ trung bình trong ngày
          const startIndex = i * 24;
          const dayTemps = data.hourly.temperature_2m.slice(
            startIndex,
            startIndex + 24
          );
          const avgTemp = Math.round(dayTemps.reduce((a, b) => a + b) / 24);

          // Lấy mã thời tiết phổ biến nhất trong ngày
          const dayCodes = data.hourly.weathercode.slice(
            startIndex,
            startIndex + 24
          );
          const commonCode = dayCodes[12]; // Lấy mã thời tiết lúc giữa trưa

          processedData.push({
            day: days[dayIndex],
            temp: avgTemp,
            weatherCode: commonCode,
            icon: getWeatherIcon(commonCode),
          });
        }

        setWeatherData(processedData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
    return () => clearInterval(timer);
  }, []);

  if (!weatherData) {
    return <div className="p-6">Đang tải...</div>;
  }

  return (
    <div className=" w-full bg-gradient-to-b from-sky-100 to-sky-50 rounded-3xl overflow-hidden">
      {/* Header Section */}
      <div className="p-6">
        <div className="text-gray-600 mb-1">
          {currentTime.toLocaleDateString("vi-VN", {
            weekday: "long",
          })}
        </div>
        <div className="text-sm text-gray-500">
          {currentTime.toLocaleDateString("vi-VN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="text-sm text-gray-500">
          {currentTime.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        {/* Temperature and Weather Condition */}
        <div className="mt-6 flex items-start">
          <div className="text-6xl font-light">{weatherData[0].temp}°C</div>
          <div className="ml-auto">
            <div className="flex items-center">
              {React.createElement(weatherData[0].icon, {
                className: "w-16 h-16 text-sky-600",
              })}
            </div>
          </div>
        </div>
        <div className="mt-1 text-gray-600 flex items-center">
          <BsDot className="w-5 h-5" />
          {getWeatherDescription(weatherData[0].weatherCode)}
        </div>
      </div>

      {/* Background Illustration */}
      <div className="relative h-32 mt-4">
        <div className="absolute inset-0">
          <svg viewBox="0 0 400 100" className="w-full h-full">
            <path
              d="M 0 50 Q 100 20 200 50 T 400 50 L 400 100 L 0 100 Z"
              fill="rgb(186, 230, 253)"
              opacity="0.4"
            />
            <path
              d="M 0 60 Q 100 30 200 60 T 400 60 L 400 100 L 0 100 Z"
              fill="rgb(186, 230, 253)"
              opacity="0.3"
            />
            <path
              d="M 0 70 Q 100 40 200 70 T 400 70 L 400 100 L 0 100 Z"
              fill="rgb(186, 230, 253)"
              opacity="0.2"
            />
          </svg>
        </div>
      </div>

      {/* Weekly Forecast */}
      <div className="bg-white p-6">
        <div className="h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weatherData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#0284c7"
                strokeWidth={2}
                dot={{ r: 3, fill: "white", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Days of Week */}
        <div className="mt-4 flex justify-between">
          {weatherData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs text-gray-500">{item.day}</div>
              <div className="mt-1">
                {React.createElement(item.icon, {
                  className: "w-6 h-6 text-sky-600",
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
